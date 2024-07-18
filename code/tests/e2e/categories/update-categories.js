const { faker } = require('@faker-js/faker');
const { container } = require('../../../container');
const { ADMIN, CUSTOMER } = require('../../utils/users');
const categoryRepository = container.resolve('categoryRepository');
const { unauthorizedTest, unauthenticatedTest, updateTest } = require('../common');

module.exports = suite => {
  describe('[PATCH] /', () => {
    let data;
    let entity = {};

    beforeAll(async () => {
      entity = await categoryRepository.findRandom();
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
      reloadEntity: () => categoryRepository.findOne(entity.id),
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
