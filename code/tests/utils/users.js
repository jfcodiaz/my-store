const AuthService = require('../../services/auth.service.js');
const { container } = require('./../../container.js');

const boom = require('@hapi/boom');

const userRepository = container.resolve('userRepository');
const authService = new AuthService();

module.exports = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  GUEST: 'guest',
  findFirstUserWithRole: async (role) => {
    if (role === this.GUEST) {
      return null;
    }
    const user = await userRepository.findFirstUserWithRole(role);
    if (user === null) {
      throw boom.notFound();
    }
    return {
      user,
      token: await authService.singToken(user).token
    };
  }
};
