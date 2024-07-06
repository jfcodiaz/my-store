const { Model } = require('sequelize');
const { customerSchemaV1, CUSTOMER_TABLE } = require('../migrations/20240605014014-create-customers');

class Customer extends Model {
  static associate (models) {
    this.belongsTo(models.User, { as: 'user' });
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: true
    };
  }
}

module.exports = {
  Customer,
  CUSTOMER_TABLE,
  CustomerSchema: { ...customerSchemaV1 }
};
