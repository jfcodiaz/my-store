const {User, UserSchema} = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, categorySchema} = require('./category.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(categorySchema, Category.config(sequelize));
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModels;
