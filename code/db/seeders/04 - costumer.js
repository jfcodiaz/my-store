const { seed } = require('../seed');
const { faker } = require('@faker-js/faker');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { USER_TABLE } = require('./../models/user.model');
const { config } = require('../../config/config');
const bcrypt = require('bcrypt');

const { container } = require('../../container');
const userRepository = container.resolve('userRepository');

module.exports = seed({
  up: async queryInterface => {
    const customerUsers = [];
    const hash = await bcrypt.hash(process.env.INITIAL_PASS, config.encryptSalt);
    for (let i = 0; i < 50; i++) {
      customerUsers.push({
        password: hash,
        email: `customer_${i}_${faker.internet.email()}`,
        role: 'customer',
        created_at: new Date()
      });
    }
    await queryInterface.bulkInsert(USER_TABLE, customerUsers);

    const users = await userRepository.findByRole('customer');
    const customers = users.map(user => {
      return {
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone: faker.number.int({ min: 1000000000, max: 9999999999 }),
        user_id: user.id,
        created_at: new Date(),
        updated_at: new Date()
      };
    });

    return queryInterface.bulkInsert(CUSTOMER_TABLE, customers);
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete(CUSTOMER_TABLE, null, {});
    await queryInterface.bulkDelete(USER_TABLE, {
      role: 'customer'
    }, {});
  }
});
