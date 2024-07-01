const CategoryService = require('./../../../services/category.service');
const { ADMIN, CUSTOMER } = require('../../utils/users');
const categoryService = new CategoryService();
const { faker } = require('@faker-js/faker');
const { unauthorizedTest, unauthenticatedTest } = require('../common');

module.exports = suite => {
  describe('[POST] /', () => {
    const method = 'post';
    unauthenticatedTest({suite, method});

    test('Reject when miss params', async () => {
      const { statusCode, body } = await suite.as(ADMIN).post();

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('error');
      expect(body).toHaveProperty('message');
      expect(body.message).toMatch(/(?=.*\bname\b)(?=.*\bimage\b)/)
    });

    test('Create category as admin', async () => {
      const data = {
        name: faker.word.adjective(),
        image: 'http://serv.com/img.jpg'
      };
      const { statusCode, body } = await suite.as(ADMIN).post({ data });
      const category = await categoryService.findOne(body.entity.id);

      expect(statusCode).toBe(201);
      expect(category.id).toBe(body.entity.id);
      expect(category.name).toBe(data.name);
      expect(category.image).toBe(data.image);
    });

    unauthorizedTest({
      suite,
      title: 'Fail to create category as customer',
      as: CUSTOMER,
      method,
      data: {
        name: faker.word.adjective(),
        image: 'http://serv.com/img.jpg'
      }
    });
  });
}
