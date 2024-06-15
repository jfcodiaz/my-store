const boom  = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { config } = require('../config/config');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, config.encryptSalt);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    })
    return await this.findOne(newCustomer.id);
    return newCustomer;
  }

  async findAll() {
    return await models.Customer.findAll({
      include: ['user']
    });
  }

  async findOne(id) {
    const entity = await models.Customer.findByPk(id, {
      include: ['user']
    });
    if(entity) return entity;
    throw boom.notFound('customer not found');
  }

  async update(id, data) {
    const model = await models.Customer.findByPk(id);
    const entity = await model.update(data);

    return entity;
  }

  async delete(id) {
    const model = await this.findOne(id);
    return model.destroy();
  }
}

module.exports = {
  CustomerService
}
