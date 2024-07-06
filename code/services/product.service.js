const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const findAll = require('./repositories/common/find-all');
const Repository = require('./repositories/common/respository');

class ProductsService extends Repository {
  model = models.Product;

  async findAll (args = {}) {
    return findAll({ model: models.Product, ...args });
  }

  async findOne (id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }

    return product;
  }

  async create (data) {
    return models.Product.create(data);
  }

  async update (id, data) {
    const entity = await this.findOne(id);
    return entity.update(data);
  }

  async delete (id) {
    const product = await this.findOne(id);
    return product.destroy();
  }
}

module.exports = ProductsService;
