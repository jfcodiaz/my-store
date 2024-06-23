const { Model } = require("sequelize");
const {CATEGORY_TABLE, categorySchema} = require('../migrations/20240606223642-create-category');

class Category extends Model {

  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: true
    };
  }

}

module.exports = {
  Category,
  categorySchema,
  CATEGORY_TABLE
}
