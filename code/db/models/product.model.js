const { Model } = require("sequelize");
const { PRODUCT_TABLE, productSchema} = require('../migrations/20240607044055-create-products');

class Product extends Model{
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: true
    }
  }
}

module.exports = {
  Product,
  PRODUCT_TABLE,
  productSchema
}
