const UserService = require('../../services/user.service.js');
const AuthService = require('../../services/auth.service.js');
const boom  = require('@hapi/boom');

const userService = new UserService();
const authService = new AuthService();

module.exports = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  findFirstUserWithRole: async (role) => {
    const user = await userService.findFirstUserWithRole(role);
    if(user === null) {
      throw boom.notFound();
    }
    return {
      user,
      token: await authService.singToken(user).token
    };
  }
}
