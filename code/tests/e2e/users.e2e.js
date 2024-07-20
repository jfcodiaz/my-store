const { faker } = require('@faker-js/faker');
const { ADMIN, CUSTOMER, GUEST } = require('../utils/users');
const e2eGenericCrudTest = require('../utils/e2e-generic-crud-test');
const { container } = require('../../container');
const repository = container.resolve('userRepository');

e2eGenericCrudTest({
  entityName: 'User',
  repository,
  title: '[User] /api/v1/users',
  entitiesEndpoint: '/api/v1/users',
  entityEndpoint: '/api/v1/users/:id',
  users: [GUEST, CUSTOMER, ADMIN],
  buildData: async () => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'admin'
    };
  },
  create: {
    allowedUsers: [ADMIN],
    requireProperties: ['email', 'role'],
    checkToBeSameProperties: ['email', 'role'],
    loadEntity: async (id) => {
      return repository.findOne(id);
    }
  },
  read: {
    usesCanReadAllPaginated: [ADMIN],
    usesCanReadAllAnyOne: [ADMIN],
    checkExistsProperties: ['id', 'email', 'role']
  },
  update: {
    usersCanUpdateAny: [ADMIN],
    checkShouldBeUpdatedPropeties: ['email']
  },
  deleteEntity: {
    usersCanDeleteAny: [ADMIN]
  }
});
