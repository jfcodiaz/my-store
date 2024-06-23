'use strict';
const UserService = require('./../../services/user.service');

const userService = new UserService();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await userService.create({
      email: 'admin@local.com',
      password: 'root'
    });
  },

  async down (queryInterface, Sequelize) {
    const user =await userService.findByEmail('admin@local.com');
    await userService.delete(user.id);
  }
};
