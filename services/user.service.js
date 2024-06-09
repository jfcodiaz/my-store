const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require('./../config/config');
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    console.log({
      data, config,
      salt: config.encryptSalt
    })
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

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, data) {
    const user = await this.findOne(id);
    const updatedUser = await user.update(data);

    return user;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
