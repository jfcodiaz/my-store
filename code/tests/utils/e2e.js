const request = require('supertest');
const { createApp, getApp, getServer }= require('./../../app');
const { upSeed, downSeed } = require('../utils/umzug');
const logger = require("../../libs/logger");

const e2e = async ({
  title = 'Suite',
  tests = () => {},
  beforeAll: userBeforeAll = (_suite) => {},
  afterAll: userAfterAll = (_suite) => {}
} = {}) => {
  describe(title, () => {
    let suite = {
      api: null,
      server: null
    };

    beforeAll(async () => {
      try {
        logger.info('Starting app and running migrations...');
        await createApp();
        await upSeed();
        suite.api = request(getApp());
        await userBeforeAll(suite);
        logger.info('Setup complete.');
      } catch (error) {
        logger.error('Error in beforeAll:', error);
        throw error;
      }
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
  });
};

module.exports = { e2e };
