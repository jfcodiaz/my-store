const { ADMIN, CUSTOMER, GUEST, CUSTOMER_2 } = require('../utils/users');
const e2eGenericCrudTest = require('../utils/e2e-generic-crud-test');
const { container } = require('../../container');
const repository = container.resolve('orderRepository');

e2eGenericCrudTest({
  debug: true,
  entityName: 'Order',
  repository,
  title: '[ORder] /api/v1/orders',
  entitiesEndpoint: '/api/v1/orders',
  entityEndpoint: '/api/v1/orders/:id',
  users: [GUEST, CUSTOMER, ADMIN],
  buildData: () => {
    return {};
  },
  create: {
    testTryCreateWithOutParames: false,
    allowedUsers: [CUSTOMER],
    requireProperties: ['email', 'role'],
    checkToBeSameProperties: ['email', 'role'],
    loadEntity: async (id) => {
      return repository.findOne(id);
    }
  },
  read: {
    usesCanReadAllPaginated: [ADMIN],
    usesCanReadAllAnyOne: [ADMIN],
    checkExistsProperties: ['id', 'email', 'role'],
    ownEntitiesReadOnlyUsers: [CUSTOMER]
  },
  deleteEntity: {
    usersCanDeleteAny: [ADMIN],
    usersWhoCanOnlyDeleteOwnEntities: [CUSTOMER, CUSTOMER_2]
  }
});
