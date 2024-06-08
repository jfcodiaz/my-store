
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { CustomerService } = require('./customer.service');

customerService = new CustomerService();

class OrderService {
  async create(data) {
    const {customerId} = data;
    const custumer = await customerService.findOne(customerId);
    return models.Order.create(data);
  }

  findAll(options) {
    return models.Order.findAll({
      include: ['customer']
    });
  }

  async findOne(id) {
    const entity = await models.Order.findByPk(id, {
      include: ['customer']
    });
    if(!entity) throw boom.notFound('Order Not Found');

    return entity;
  }

  async update(id, data) {
    const entity = await this.findOne(id);
    entity.update(data);

    return entity;
  }

  async delete(id) {
    const entity = await this.findOne(id);
    return entity.destroy()
  }
}

module.exports = { OrderService };
