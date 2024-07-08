const { e2e } = require('../e2e');
const readGenericTest = require('./crud/read-generic-test');
const updateGnericTest = require('./crud/update-gneric-test');
const creteGenericTest = require('./crud/create-generic-test');
const deleteGenericTest = require('./crud/delete-generi-test');

const e2eGenericCrudTest = ({
  title = 'Generic Crud Test',
  EntityRepository,
  entityName,
  entitiesEndpoint,
  entityEndpoint,
  users = [],
  buildData = () => ({}),
  create = {
    allowedUsers: []
  },
  read = {
    allowedUsers: []
  },
  update = {
    usersCanUpdateAny: []
  },
  delete: deleteEntity = {
    usersCanDeleteAny: []
  },
  findRandomEntity = async () => {
    return (new EntityRepository()).findRandom();
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
      creteGenericTest({
        suite, entityName, users, create, buildData
      });
      readGenericTest({
        suite, entityName, read, users, findRandomEntity
      });
      updateGnericTest({
        suite,
        entityEndpoint,
        entityName,
        update,
        users,
        buildData,
        findRandomEntity,
        EntityRepository,
        getParams: getParamsForOne
      });
      deleteGenericTest({
        suite,
        deleteEntity,
        entityEndpoint,
        EntityRepository,
        getParams: getParamsForOne
      });
    }
  });
};

module.exports = e2eGenericCrudTest;
