const { e2e } = require('../e2e');
const readGenericTest = require('./crud/read-generic-test');
const updateGnericTest = require('./crud/update-gneric-test');
const creteGenericTest = require('./crud/create-generic-test');
const deleteGenericTest = require('./crud/delete-generi-test');

const e2eGenericCrudTest = ({
  title = 'Generic Crud Test',
  debug = false,
  repository,
  entityName,
  entitiesEndpoint,
  entityEndpoint,
  users = [],
  buildData = () => ({}),
  create = {
    allowedUsers: []
  },
  read = {
    usesCanReadAllPaginated: [],
    usesCanReadAllAnyOne: []
  },
  update = {
    usersCanUpdateAny: []
  },
  deleteEntity = {
    usersCanDeleteAny: []
  },
  findRandomEntity = async () => {
    return repository.findRandom();
  },
  getParamsForOne = (entity) => {
    return {
      id: entity.id
    };
  }
} = {}) => {
  e2e({
    title,
    beforeAll: async (suite) => {
      suite
        .addEndpoint('entities', entitiesEndpoint)
        .addEndpoint('entity', entityEndpoint);

      await Promise.all(
        users.map((user) => {
          return suite.loadUser(user);
        })
      );
    },
    beforeEach: async suite => {
      suite.setEndpoint('entities');
    },
    tests: (suite) => {
      create.allowedUsers.length && creteGenericTest({
        suite, entityName, users, create, buildData, debug
      });
      (read.usesCanReadAllPaginated.length || read.usesCanReadAllAnyOne.length) && readGenericTest({
        suite, entityName, read, users, findRandomEntity
      });
      update.usersCanUpdateAny.length && updateGnericTest({
        suite,
        debug,
        entityEndpoint,
        entityName,
        update,
        users,
        buildData,
        findRandomEntity,
        repository,
        getParams: getParamsForOne
      });
      deleteEntity.usersCanDeleteAny.length && deleteGenericTest({
        suite,
        deleteEntity,
        entityEndpoint,
        repository,
        getParams: getParamsForOne
      });
    }
  });
};

module.exports = e2eGenericCrudTest;
