const { e2e } = require('../e2e');
const readGenericTest = require('./crud/read-generic-test');
const updateGnericTest = require('./crud/update-gneric-test');
const creteGenericTest = require('./crud/create-generic-test');

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
  findRandomEntity = async () => {
    return (new EntityRepository()).findRandom();
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
        suite, entityName, create, users, findRandomEntity
      });
    }
  });
};

module.exports = e2eGenericCrudTest;