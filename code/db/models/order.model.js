const { Model } = require('sequelize');
const { ORDER_TABLE, orderSchema: orderSchemaV1 } = require('../migrations/20240607205530-craete-orders');

const orderSchema = {
  ...orderSchemaV1
};

class Order extends Model {
  static associate (models) {
    this.belongsTo(models.Customer, {
      as: 'customer'
    });
    this.belongsToMany(models.Product, {
      as: 'products',
      through: models.OrderItem,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
    this.hasMany(models.OrderItem, {
      as: 'items',
      foreignKey: 'orderId'
    });
  }

  static config (sequelize) {
    return {
      sequelize,
      timestamp: true,
      modelName: 'Order',
      tableName: ORDER_TABLE
    };
  }
}

module.exports = { Order, ORDER_TABLE, orderSchema };
