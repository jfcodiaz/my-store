const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  async create(data) {
    return models.Order.create(data);
  }

  findAll() {
    return models.Order.findAll({
      include: ['customer', 'items']
    });
  }

  async findOne(id) {
    const entity = await models.Order.findByPk(id, {
      include: [
        { model: models.Customer, as: 'customer' },
        {
          model: models.OrderItem,
          as: 'items',
          include: [
            { model: models.Product, as: 'product' }
          ]
        }
      ]
    });
    if(!entity) throw boom.notFound('Order Not Found');

    return entity;
  }

  findByUser(userId) {
    return models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        {
          model: models.OrderItem,
          as: 'items',
          include: [
            { model: models.Product, as: 'product' }
          ]
        }
      ]
    });

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

  async addItem(orderId, data) {
    return models.OrderItem.create({
      orderId,
      ...data
    });
  }

  async removeItem(orderId, itemId) {
    const item = await models.OrderItem.findOne({
      where: {
        orderId,
        id: itemId
      }
    });
    if(!item) throw boom.notFound('Item not found');

    return item.destroy();
  }
}

module.exports = { OrderService };
