const request = require('supertest');
const SuiteE2E = require('./suite-e2e');
const logger = require('../../libs/logger');
const buildRoute = require('../../utils/buildRoute');
const { upSeed, downSeed } = require('../utils/umzug');
const { createApp, getApp, getServer } = require('./../../app');
const { findFirstUserWithRole, ADMIN, CUSTOMER, CUSTOMER_USER_ID, CUSTOMER_2_USER_ID, CUSTOMER_2, findUserById } = require('./users');

const e2e = async ({
  title = 'Suite',
  tests = () => {},
  afterAll: userAfterAll = async (_suite) => {},
  afterEach: userAfterEach = async (_suite) => {},
  beforeAll: userBeforeAll = async (_suite) => {},
  beforeEach: useBeforeEach = async (_suite) => {}
} = {}) => {
  describe(title, () => {
    const suite = new SuiteE2E({
      [ADMIN]: async () => await findFirstUserWithRole(ADMIN),
      [CUSTOMER]: async () => await findUserById(CUSTOMER_USER_ID),
      [CUSTOMER_2]: async () => await findUserById(CUSTOMER_2_USER_ID)
    },
    buildRoute
    );

    beforeAll(async () => {
      try {
        logger.info('Starting app and running migrations...');
        createApp();
        await upSeed();
        suite.setApi(request(getApp()));
        await userBeforeAll(suite);
        logger.info('Setup complete.');
      } catch (error) {
        logger.error('Error in beforeAll:', error);
        throw error;
      }
    });

    beforeEach(async () => {
      useBeforeEach(suite);
    });

    afterEach(async () => {
      userAfterEach(suite);
    });

    tests(suite);

    afterAll(async () => {
      try {
        logger.info('Cleaning up...');
        await userAfterAll(suite);
        await downSeed();
        getServer().close();
        logger.info('Cleanup complete.');
      } catch (error) {
        logger.error('Error in afterAll:', error);
        throw error;
      }
    });
  }
  );
};

module.exports = { e2e };
