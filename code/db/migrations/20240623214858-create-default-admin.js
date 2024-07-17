'use strict';
const { container } = require('./../../container');
const userRepository = container.resolve('userRepository');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up () {
    await userRepository.create({
      email: 'admin@local.com',
      password: process.env.INITIAL_PASS
    });
  },

  async down () {
    const user = await userRepository.findByEmail('admin@local.com');
    if (user) await userRepository.delete(user.id);
  }
};
