'use strict';
const UserService = require('./../../services/user.service');

const userService = new UserService();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up () {
    await userService.create({
      email: 'admin@local.com',
      password: process.env.INITIAL_PASS
    });
  },

  async down () {
    const user =await userService.findByEmail('admin@local.com');
    if(user) await userService.delete(user.id);
  }
};
