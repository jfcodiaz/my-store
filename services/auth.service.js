const boom = require('@hapi/boom');
const bcript = require('bcrypt');
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
    const isMatch = await bcript.compare(password, user.password);
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
}

module.exports = AuthService;
