const getOneTest = require('../common/get-one');
const paginationTest = require('../common/pagination');
const { ADMIN, CUSTOMER } = require('../../utils/users');
const unauthenticatedTest = require('../common/unauthenticated');
const CategoryService = require('../../../services/category.service');

module.exports = async suite => {
  describe('[GET] /', () => {
    const categoryService = new CategoryService();

    paginationTest({
      title: 'Get all with pagination as Admin',
      suite,
      as: ADMIN
    });

    paginationTest({
      title: 'Get all with pagination as Customer',
      suite,
      as: CUSTOMER
    });

    getOneTest({
      suite,
      title: 'Get one as Admin',
      as: ADMIN,
      endpoint: 'category',
      loadEntityFn: async () => {
        return await categoryService.findOneRadom();
      },
      expects: async (entiy, body) => {
        expect(entiy.id).toBe(body.id);
        expect(entiy.name).toBe(body.name);
        expect(entiy.image).toBe(body.image);
      }
    });

    unauthenticatedTest({ suite });
  });
};
