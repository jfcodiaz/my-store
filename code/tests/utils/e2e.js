const { config } = require("./../../config/config");
const request = require('supertest');
const { createApp, getApp, getServer }= require('./../../app');
const { upSeed, downSeed } = require('../utils/umzug');

e2e = async (title, tests) => {
  describe(title, () => {
    let suite = {
      api: null,
      server: null
    };

    beforeAll(async () => {
      createApp();
      await upSeed();
      suite.api = request(getApp());
    });

    tests(suite);

    afterAll(async() => {
      await downSeed();
      getServer().close();
    });
  })
}

module.exports = { e2e }
