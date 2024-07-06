const { seed } = require('../seed');
const { faker } = require('@faker-js/faker');
const { PRODUCT_TABLE } = require('../models/product.model');
const CategoryService = require('../../services/category.service');

module.exports = seed({
  up: async queryInterface => {
    const products = [];

    const categoryService = new CategoryService();
    const categories = await categoryService.findAll({ pagination: false });
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
