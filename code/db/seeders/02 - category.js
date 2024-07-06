const { seed } = require('../seed');
const { faker } = require('@faker-js/faker');
const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = seed({
  up: async queryInterface => {
    const categories = [];
    for (let i = 0; i < 10; i++) {
      categories.push({
        name: `${faker.lorem.words({ min: 4, max: 5 })} ${new Date().getTime()}`,
        image: faker.internet.url(),
        created_at: new Date()
      });
    }

    return queryInterface.bulkInsert(CATEGORY_TABLE, categories);
  },
  down: async queryInterface => {
    return queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
  }
});
