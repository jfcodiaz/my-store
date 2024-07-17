const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const userRepository = require('./../container').container.resolve('userRepository');
const { config } = require('../config/config');

class AuthService {
  async getUser (email, password) {
    const user = await userRepository.findByEmail(email, { scope: 'withPassword' });
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }

    return await userRepository.findByEmail(email);
  }

  singToken (user) {
    const playload = {
      sub: user.id,
      role: user.role
    };

    const token = jwt.sign(playload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async sendRecovery (email) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return;
    }

    const playload = { sub: user.id };
    const token = jwt.sign(playload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://localhost/?token=${token}`;
    await userRepository.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.smtpEmail,
      to: user.email,
      subject: 'Recovery password',
      html: `<b>Ingresa a este link : ${link}</b>`
    };
    await this.sendEmail(mail);
  }

  async changePassword (token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      let user = await userRepository.findOne(payload.sub, { scope: 'withPassword' });
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, config.encryptSalt);
      await userRepository.update(user.id, {
        recoveryToken: null,
        password: hash
      });
      user = await userRepository.findOne(payload.sub);
      return this.singToken(user);
    } catch {
      throw boom.unauthorized();
    }
  }

  async sendEmail (infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      secure: config.smtpSecure,
      port: config.smtpPort,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    });
    await transporter.sendMail(infoMail);

    return true;
  }
}

module.exports = AuthService;
