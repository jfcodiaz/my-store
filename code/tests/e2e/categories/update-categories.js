const { faker } = require('@faker-js/faker');
const { ADMIN, CUSTOMER } = require('../../utils/users');
const CategoryService = require('../../../services/category.service');
const { unauthorizedTest, unauthenticatedTest, updateTest } = require('../common');

module.exports = suite => {
  describe('[PATCH] /', () => {
    const categoryService = new CategoryService();
    let data;
    let entity = {};

    beforeAll(async () => {
      entity = await categoryService.findOneRadom();
      data = {
        name: `${faker.commerce.department()} ${new Date().getTime()}`,
        image: faker.internet.url()
      };
    });

    beforeEach(async () => {
      suite.setEndpoint('category', { id: entity.id }, {});
    });

    updateTest({
      suite,
      title: 'Update category as admin [building]',
      as: ADMIN,
      data: () => data,
      getEntity: async () => entity,
      reloadEntity: () => categoryService.findOne(entity.id),
      expectsEquals: ['name', 'image']
    });

    unauthorizedTest({
      suite,
      title: 'Should fail on try update as customer [building]',
      data,
      method: 'patch',
      as: CUSTOMER
    });

    unauthenticatedTest({
      suite,
      title: 'building',
      data
    });
  });
};
