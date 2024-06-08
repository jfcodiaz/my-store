const { Model, DataTypes } = require("sequelize");
const { ORDER_TABLE, orderSchema: orderSchemaV1} = require('./../migrations/20240607205530-craete-orders');


const orderSchema = {
  ...orderSchemaV1,
}

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamp: true
    }
  }
}

module.exports = {Order, ORDER_TABLE, orderSchema};
