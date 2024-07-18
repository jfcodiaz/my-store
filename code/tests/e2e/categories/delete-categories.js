const { unauthorizedTest } = require('../common');
const { container } = require('../../../container');
const { ADMIN, CUSTOMER } = require('../../utils/users');
const categoryRepository = container.resolve('categoryRepository');

module.exports = async suite => {
  describe('[DELETE] /', () => {
    beforeEach(async () => {
      const category = await categoryRepository.findRandom();
      suite.setEndpoint('category', { id: category.id });
    });

    test('should delete as admin', async () => {
      const { statusCode } = await suite
        .as(ADMIN)
        .delete();
      expect(statusCode).toBe(204);
    });

    unauthorizedTest({
      suite,
      title: 'should fail when a customer try delete category',
      as: CUSTOMER,
      method: 'delete'
    });
  });
};
