const { faker } = require('@faker-js/faker');
const { ADMIN, CUSTOMER, GUEST } = require('../utils/users');
const e2eGenericCrudTest = require('../utils/e2e-generic-crud-test');
const { container } = require('../../container');
const repository = container.resolve('productRepository');
const categoryRepository = container.resolve('categoryRepository');

e2eGenericCrudTest({
  entityName: 'Product',
  repository,
  title: '[Product] /api/v1/products',
  entitiesEndpoint: '/api/v1/products',
  entityEndpoint: '/api/v1/products/:id',
  users: [GUEST, CUSTOMER, ADMIN],
  buildData: async () => {
    const category = await categoryRepository.findRandom();
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
      return repository.findOne(id);
    }
  },
  read: {
    usesCanReadAllPaginated: [ADMIN, CUSTOMER],
    usesCanReadAllAnyOne: [ADMIN, CUSTOMER],
    checkExistsProperties: ['id', 'name', 'description', 'price']
  },
  update: {
    usersCanUpdateAny: [ADMIN]
  },
  deleteEntity: {
    usersCanDeleteAny: [ADMIN]
  }
});
