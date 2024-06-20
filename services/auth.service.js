const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require('./../config/config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const UserService = require('./user.service');

const userService = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email, {scope: 'withPassword'});
    if(!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      throw boom.unauthorized();
    }

    return user;
  }

  singToken(user) {
    const playload = {
      sub: user.id,
      role:  user.role
    }

    const token = jwt.sign(playload, config.jwtSecret);
    return {
      user,
      token
    }
  }

  async sendRecovery(email) {
    const user = await userService.findByEmail(email);
    if(!user) {
      return;
    }

    const playload = { sub: user.id};
    const token = jwt.sign(playload, config.jwtSecret, { expiresIn: '15min'});
    const link = `http://localhost/?token=${token}`;
    await userService.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.smtpEmail,
      to: user.email,
      subject: "Recovery password",
      html: `<b>Ingresa a este link : ${link}</b>`
    }
    await this.sendEmail(mail);
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      let user = await userService.findOne(payload.sub, {scope: 'withPassword'});
      if(user.recoveryToken != token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, config.encryptSalt);
      await userService.update(user.id, {
        recoveryToken: null,
        password: hash
      });
      user = await userService.findOne(payload.sub);
      return this.singToken(user);
    } catch {
      throw boom.unauthorized();
    }
  }
  async sendEmail(infoMail) {
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
