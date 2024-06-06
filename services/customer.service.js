const boom  = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    })
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
