const UserService = require('../../../services/user.service.js');
const { e2e } = require('../../utils/e2e.js');
const loginTest = require('./login.js');

const userService = new UserService();

e2e({
  title: 'Test for auth /api/v1/auth',
  beforeAll: async (suite) => {
    suite.user = await userService.findOne(1);
  },
  tests: (suite) => {
    loginTest(suite);
  }
});
