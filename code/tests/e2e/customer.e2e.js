const { faker } = require('@faker-js/faker');
const { ADMIN, CUSTOMER, GUEST } = require('../utils/users');
const e2eGenericCrudTest = require('../utils/e2e-generic-crud-test');
const { container } = require('../../container');
const repository = container.resolve('customerRepository');

e2eGenericCrudTest({
  entityName: 'Customer',
  repository,
  title: '[Customer] /api/v1/customers',
  entitiesEndpoint: '/api/v1/customers',
  entityEndpoint: '/api/v1/customers/:id',
  users: [GUEST, CUSTOMER, ADMIN],
  buildData: async (updating) => {
    const data = {
      name: faker.word.adjective(),
      lastName: faker.lorem.words(10),
      phone: faker.number.int({ min: 1000000000, max: 9999999999 }).toString()
    };

    if (!updating) {
      data.user = {
        password: faker.internet.password(),
        email: faker.internet.email()
      };
    }

    return data;
  },
  create: {
    allowedUsers: [GUEST, CUSTOMER, ADMIN],
    requireProperties: ['name', 'lastName', 'phone'],
    checkToBeSameProperties: ['name', 'lastName', 'phone', 'price'],
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
