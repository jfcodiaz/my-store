const { faker } = require('@faker-js/faker');
const { ADMIN, CUSTOMER, GUEST } = require('../../utils/users');
const ProductsService = require('../../../services/product.service');
const CategoryService = require('../../../services/category.service');
const e2eGenericCrudTest = require('../../utils/e2e-generic-crud-test');

const productService = new ProductsService();
const categoryService = new CategoryService();

e2eGenericCrudTest({
  entityName: 'Product',
  EntityRepository: ProductsService,
  title: '[Product] /api/v1/products',
  entitiesEndpoint: '/api/v1/products',
  entityEndpoint: '/api/v1/products/:id',
  users: [GUEST, CUSTOMER, ADMIN],
  buildData: async () => {
    const category = await categoryService.findOneRadom();
    return {
      name: faker.word.adjective(),
      description: faker.lorem.words(10),
      price: parseInt(faker.finance.amount(), 10),
      image: faker.internet.url(),
      categoryId: category.id
    };
  },
  create: {
    allowedUsers: [ADMIN],
    requireProperties: ['name', 'description', 'price'],
    checkToBeSameProperties: ['id', 'name', 'description', 'price'],
    loadEntity: async (id) => {
      return productService.findOne(id);
    }
  },
  read: {
    usesCanReadAllPaginated: [ADMIN, CUSTOMER],
    usesCanReadAllAnyOne: [ADMIN, CUSTOMER],
    checkExistsProperties: ['id', 'name', 'description', 'price']
  },
  update: {
    usersCanUpdateAny: [ADMIN, CUSTOMER]
  },
  delete: {
    usersCanDeleteAny: [ADMIN]
  }
});
