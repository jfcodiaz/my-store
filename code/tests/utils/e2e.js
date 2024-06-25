const { config } = require("./../../config/config");
const request = require('supertest');
const { createApp, getApp, getServer }= require('./../../app');
const { upSeed, downSeed } = require('../utils/umzug');

const e2e = async ({
  title = 'Suite',
  tests = () => {},
  beforeAll: userBeforeAll = (suite) => {},
  afterAll: userAfterAll = (suite) => {}
} = {}) => {
  describe(title, () => {
    let suite = {
      api: null,
      server: null
    };

    beforeAll(async () => {
      try {
        console.log('Starting app and running migrations...');
        await createApp();
        await upSeed();
        suite.api = request(getApp());
        await userBeforeAll(suite);
        console.log('Setup complete.');
      } catch (error) {
        console.error('Error in beforeAll:', error);
        throw error;
      }
    });

    tests(suite);

    afterAll(async () => {
      try {
        console.log('Cleaning up...');
        await userAfterAll(suite);
        await downSeed();
        getServer().close();
        console.log('Cleanup complete.');
      } catch (error) {
        console.error('Error in afterAll:', error);
        throw error;
      }
    });
  });
};

module.exports = { e2e };
