const request = require('supertest');
const { createApp, getApp, getServer } = require('./../../app');
const { upSeed, downSeed } = require('../utils/umzug');
const logger = require("../../libs/logger");
const SuiteE2E = require('./suite-e2e');
const { findFirstUserWithRole, ADMIN, CUSTOMER } = require('./users');
const buildRoute = require('../../utils/buildRoute');

const e2e = async ({
    title = 'Suite',
    tests = () => {},
    beforeAll: userBeforeAll = async (_suite) => {},
    afterAll: userAfterAll = async (_suite) => {},
    afterEach: userAfterEach = async (_suite) => {},
    beforeEach: useBeforeEach = async (_suite) => {}
  } = {}) => {
    describe(title, () => {
      let suite = new SuiteE2E({
          [ADMIN]: async() =>  await findFirstUserWithRole(ADMIN),
          [CUSTOMER]: async() =>  await findFirstUserWithRole(CUSTOMER),
        },
        buildRoute
      );

      beforeAll(async () => {
        try {
          logger.info('Starting app and running migrations...');
          await createApp();
          await upSeed();
          suite.setApi(request(getApp()));
          await userBeforeAll(suite);
          logger.info('Setup complete.');
        } catch (error) {
          logger.error('Error in beforeAll:', error);
          throw error;
        }
      });

      beforeEach(async() => {
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
