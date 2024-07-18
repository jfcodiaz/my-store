const { seed } = require('../seed');
const { faker } = require('@faker-js/faker');
const { PRODUCT_TABLE } = require('../models/product.model');
const { container } = require('../../container');
const categoryRepository = container.resolve('categoryRepository');

module.exports = seed({
  up: async queryInterface => {
    const products = [];
    const categories = await categoryRepository.findAll({ pagination: false });
    categories.forEach(category => {
      for (let i = 0; i < 5; i++) {
        products.push({
          name: faker.word.adjective(),
          description: faker.word.words(10),
          price: parseInt(faker.finance.amount()),
          created_at: new Date(),
          image: faker.internet.url(),
          category_id: category.id
        });
      }
    });

    return queryInterface.bulkInsert(PRODUCT_TABLE, products);
  },
  down: async queryInterface => {
    return queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  }
});
