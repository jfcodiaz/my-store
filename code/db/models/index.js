const { User, UserSchema } = require('./user.model.js');
const { Customer, CustomerSchema } = require('./customer.model.js');
const { Category, categorySchema } = require('./category.model.js');
const { Product, productSchema } = require('./product.model.js');
const { Order, orderSchema } = require('./order.model.js');
const { OrderItem, orderItemSchema } = require('./order-item.model.js');

function setupModels (sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(categorySchema, Category.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
  Order.init(orderSchema, Order.config(sequelize));
  OrderItem.init(orderItemSchema, OrderItem.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Product.associate(sequelize.models);
  Category.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderItem.associate(sequelize.models);
}

module.exports = setupModels;
