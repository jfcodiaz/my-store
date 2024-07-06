const CategoryService = require('../../../services/category.service');
const { ADMIN, CUSTOMER } = require('../../utils/users');
const { unauthorizedTest } = require('../common');

module.exports = async suite => {
  describe('[DELETE] /', () => {
    beforeEach(async () => {
      const categoryService = new CategoryService();
      const category = await categoryService.findOneRadom();
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
