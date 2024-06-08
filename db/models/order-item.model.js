const { Model } = require("sequelize");
const { ORDER_ITEM_TABLE, orderItemSchema } = require('./../migrations/20240608011618-create-order-item');

class OrderItem extends Model {
  static associate(models) {
    this.belongsTo(models.Product, {
      'as': 'product',
      'foreignKey': 'productId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_ITEM_TABLE,
      modelName: 'OrderItem',
      timestamps: false
    }
  }
}

module.exports = { OrderItem, ORDER_ITEM_TABLE, orderItemSchema}
