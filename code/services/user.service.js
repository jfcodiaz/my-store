const { models } = require('../libs/sequelize');

class UserService {
  async findByEmail (email, options = { scope: 'defaultScope' }) {
    const user = await models.User.scope(options.scope).findOne({
      ...options,
      where: {
        email
      }
    });

    return user;
  }

  findFirstUserWithRole (role) {
    return models.User.findOne({
      where: { role }
    });
  }
}

module.exports = UserService;
