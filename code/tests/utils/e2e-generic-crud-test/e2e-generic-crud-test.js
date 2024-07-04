const { e2e } = require("../e2e")
const creteGenericTest = require("./create-generic-test")

const e2eGenericCrudTest = ({
  title = 'Generic Crud Test',
  entitiesEndpoint,
  entityEndpoint,
  users = [],
  buildData = () => ({}),
  debug = (statusCode, body, text) => {},
  create = {
    allowedUsers: []
  },
  read = {
    allowedUsers: []
  }
} ={}) => {
  e2e({
    title,
    beforeAll: async(suite) => {
      suite
        .addEndpoint('entities', entitiesEndpoint)
        .addEndpoint('entity', entityEndpoint)
      await Promise.all(
        users.map((user) => {
          suite.loadUser(user)
        })
      )
    },
    beforeEach: async suite => {
      suite.setEndpoint('entities');
    },
    tests: (suite) => {
      creteGenericTest({
        suite, users, create, buildData, debug
      });
      /*readGenericTest({
        suite, read, users
      });
      */
      //updateGenericTest();
      //deleteGenericTest();
     // test('defautl', () => { expect(true).toBe(true)})
    }
  })
}

module.exports = e2eGenericCrudTest;
