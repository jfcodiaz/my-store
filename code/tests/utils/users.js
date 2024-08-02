const AuthService = require('../../services/auth.service.js');
const { container } = require('./../../container.js');

const boom = require('@hapi/boom');

const userRepository = container.resolve('userRepository');
const authService = new AuthService();

const sing = async (user) => {
  if (user === null) {
    throw boom.notFound();
  }
  return {
    user,
    token: await authService.singToken(user).token
  };
};

module.exports = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  CUSTOMER_2: 'cusomter2',
  GUEST: 'guest',
  ALL: ['admin', 'customer', 'cusomter2', 'guest'],
  CUSTOMER_USER_ID: 5,
  CUSTOMER_2_USER_ID: 6,
  findUserById: async (id) => {
    const user = await userRepository.findOne(id);
    return sing(user);
  },
  findFirstUserWithRole: async (role) => {
    if (role === this.GUEST) {
      return null;
    }
    const user = await userRepository.findFirstUserWithRole(role);
    return sing(user);
  }
};
