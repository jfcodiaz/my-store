const { e2e } = require('../../utils/e2e.js');
const { ADMIN } = require('../../utils/users.js');
const loginTest = require('./login.js');

e2e({
  title: 'Test for auth /api/v1/auth',
  beforeAll: async (suite) => {
    await suite.loadUser(ADMIN);
    suite
      .addEndpoint('login', '/api/v1/auth/login')
      .setEndpoint('login');
  },
  beforeEach: async (suite) => {
    suite.asGuest();
  },
  tests: (suite) => {
    loginTest(suite);
  }
});
