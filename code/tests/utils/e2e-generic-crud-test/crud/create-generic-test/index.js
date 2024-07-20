const { GUEST } = require('../../../users');
const toBeSameArrayProp = require('../../../expects/to-be-same-array-prop');
const failOnCreateWithoutParamsTest = require('./fail-on-create-without-params');
const { unauthorizedTest, unauthenticatedTest } = require('../../../../e2e/common');
const { container } = require('./../../../../../container');
const logger = container.resolve('logger');
const creteGenericTest = async ({
  suite,
  debug,
  users,
  create,
  buildData,
  entityName,
  extractExpect = () => {}
} = {}) => {
  describe('[POST] /', () => {
    // Unathorized and / or unautneticated
    users.filter(user => !create.allowedUsers.includes(user))
      .forEach(noAllowedUser => {
        if (noAllowedUser === GUEST) {
          unauthenticatedTest({ suite, method: 'post' });

          return;
        }
        unauthorizedTest({
          suite,
          title: `Fail to create ${entityName} as ${noAllowedUser}`,
          as: noAllowedUser,
          method: 'post',
          data: {}
        });
      });

    failOnCreateWithoutParamsTest(entityName, suite, create);

    // Create entity as allowed users
    create.allowedUsers.forEach(async alloweUser => {
      test(`Create ${entityName} as ${alloweUser} successfully`, async () => {
        const data = await buildData();
        const { statusCode, body, text } = await suite.as(alloweUser).post({ data });
        if (debug) {
          logger.info({ statusCode, body, text });
        }
        expect(statusCode).toBe(201);
        const entity = await create.loadEntity(body.id);
        extractExpect(statusCode, body, text, entity);
        toBeSameArrayProp(create.checkToBeSameProperties, entity, body);
      });
    });
  });
};

module.exports = creteGenericTest;
