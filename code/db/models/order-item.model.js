const { Model } = require('sequelize');
const { ORDER_ITEM_TABLE, orderItemSchema } = require('../migrations/20240608011618-create-order-item');

class OrderItem extends Model {
  static associate (models) {
    this.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'productId'
    });
  }

  static config (sequelize) {
    return {
      sequelize,
      timestamps: false,
      modelName: 'OrderItem',
      tableName: ORDER_ITEM_TABLE
    };
  }
}

module.exports = { OrderItem, ORDER_ITEM_TABLE, orderItemSchema };
