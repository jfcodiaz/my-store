const { e2e } = require('../../utils/e2e.js');
const { ADMIN, CUSTOMER } = require('../../utils/users.js');
const createCategoriesTest = require('./create-categories');
const readCategoriesTest = require('./read-categories');
const updateCategorieTest = require('./update-categories');
const deleteCategoriesTest = require('./delete-categories');

e2e({
  title: '[Categories] /api/v1/categories',
  beforeAll: async suite => {
    suite
      .addEndpoint('categories', '/api/v1/categories/')
      .addEndpoint('category', '/api/v1/categories/:id');

    await Promise.all([
      suite.loadUser(ADMIN),
      suite.loadUser(CUSTOMER)
    ]);
  },
  beforeEach: async suite => {
    suite.setEndpoint('categories');
  },
  tests: (suite) => {
    createCategoriesTest(suite);
    readCategoriesTest(suite);
    updateCategorieTest(suite);
    deleteCategoriesTest(suite);
  }
});
