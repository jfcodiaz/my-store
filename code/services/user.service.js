const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require('../config/config');
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, config.encryptSalt);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });

    return this.findOne(newUser.id);
  }

  async find() {
    return models.User.findAll();
  }

  async findOne(id, options= {scope:'defaultScope'}) {
    const user = await models.User.scope(options.scope).findByPk(id, options);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id) {
    const user = await this.findOne(id);

    return user;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }

  async findByEmail(email, options= {scope:'defaultScope'}) {
    const user =  await models.User.scope(options.scope).findOne({
      ...options,
      where: {
        email
      }
    })

    return user;
  }

  findFirstUserWithRole(role) {
    return models.User.findOne({
      where: { role }
    });
  }
}

module.exports = UserService;
