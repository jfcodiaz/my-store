const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const { config } = require('../../config/config');
const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    const users = [];
    const hash = await bcrypt.hash(process.env.INITIAL_PASS, config.encryptSalt);

    for (let i = 0; i < 2; i++) {
      users.push({
        password: hash,
        email: `admin_${i}_${faker.internet.email()}`,
        role: 'admin',
        created_at: new Date()
      });
    }

    return queryInterface.bulkInsert(USER_TABLE, users);
  },

  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
