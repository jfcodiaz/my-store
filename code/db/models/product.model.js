const { Model } = require('sequelize');
const { PRODUCT_TABLE, productSchema } = require('../migrations/20240607044055-create-products');
const { imageSchema } = require('../migrations/20240704022127-add-image-to-product');

class Product extends Model {
  static modelName = 'Product';

  static associate (models) {
    this.belongsTo(models.Category, { as: 'category' });
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: this.modelName,
      timestamps: true
    };
  }
}

module.exports = {
  Product,
  PRODUCT_TABLE,
  productSchema: { ...productSchema, image: imageSchema }
};
