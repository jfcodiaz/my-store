const { seed } = require('../seed');
const { faker } = require('@faker-js/faker');
const { container } = require('../../container');
const { ORDER_TABLE } = require('../models/order.model');
const customerRepository = container.resolve('customerRepository');

module.exports = seed({
  up: async queryInterface => {
    const customers = await customerRepository.findAll({ pagination: false });
    const createdAt = new Date();
    const updatedAt = new Date();
    const orders = [];
    customers.forEach(customer => {
      for (let i = 0; i < faker.number.int(50); i++) {
        orders.push({
          customer_id: customer.id,
          created_at: createdAt,
          updated_at: updatedAt
        });
      }
    });
    return queryInterface.bulkInsert(ORDER_TABLE, orders);
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete(ORDER_TABLE, null, {});
  }
});
