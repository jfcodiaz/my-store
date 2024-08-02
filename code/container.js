const express = require('express');
const pluralize = require('pluralize');
const capitalize = require('capitalize');
const { models } = require('./db/sequelize');
const { config } = require('./config/config');
const logger = require('./libs/logger');
const { makeInvoker } = require('awilix-express');
const { scopePerRequest } = require('awilix-express');
const container = require('awilix').createContainer();
const { asClass, asValue, asFunction } = require('awilix');
const UserRepository = require('./services/repositories/user.repository');
const ProductRepository = require('./services/repositories/product.repository');
const CategoriesRepository = require('./services/repositories/category.repository');
const CustomerRepository = require('./services/repositories/customer.respository');
const OrderRepository = require('./services/repositories/order.repository');
const paginate = require('./services/paginate');
const sequelize = require('./libs/sequelize');

// Rrgister Models
container.register(Object.entries(models).reduce((acc, [model, value]) => ({
  ...acc, [`${model.toLowerCase()}Model`]: asValue(value)
}), {}));

container.register({
  // Config
  config: asValue(config),
  sequelize: asValue(sequelize),
  container: asFunction(() => container).singleton(),
  // Third-party Libraries
  encrypt: asFunction(() => require('bcrypt')).singleton(),
  boom: asFunction(() => require('@hapi/boom')).singleton(),
  logger: asValue(logger),
  // Repositories
  userRepository: asClass(UserRepository).singleton(),
  productRepository: asClass(ProductRepository).singleton(),
  categoryRepository: asClass(CategoriesRepository).singleton(),
  customerRepository: asClass(CustomerRepository).singleton(),
  orderRepository: asClass(OrderRepository).singleton(),
  // Services
  getBasePath: asFunction(() => require('./services/get-base-path').getBasePath).singleton(),
  getAbsoluteUrl: asFunction(() => require('./services/get-base-path').getAbsoluteUrl).singleton(),
  paginate: asFunction(paginate).singleton()

});

// Fn Services whit dependeces:
// - Services:
const encrypt = container.resolve('encrypt');
const routers = {
  v1: ['/api/v1', express.Router()],
  v2: ['/api/v2', express.Router()]
};

// - Fn Services
container.register({
  hash: asFunction(() => require('./services/hash')({ encrypt, config })).singleton(),
  setupController: asFunction(
    () => require('./services/setup-controller').init({
      asFunction,
      container,
      routers,
      capitalize,
      pluralize,
      express,
      makeInvoker
    })
  ).singleton()
});
container.register({
  addController: asFunction(
    () =>
      (title, routerVersion, services) =>
        container.resolve('setupController').add(title, routerVersion, services)
  ).singleton()
});

// Controllers Base
container.register({
  createEntity: asFunction(() => require('./controllers/common/create')).singleton(),
  readOneEntity: asFunction(() => require('./controllers/common/read-one')).singleton(),
  readAllEntity: asFunction(() => require('./controllers/common/read-all')).singleton(),
  updateEntity: asFunction(() => require('./controllers/common/update')).singleton(),
  destroyEntity: asFunction(() => require('./controllers/common/destroy')).singleton()
});

// Validators
container.register({
  categoryValidators: asFunction(() => require('./schemas/cateory.schema')).singleton(),
  customerValidators: asFunction(() => require('./schemas/customer.schema')).singleton()
});

// Controller Makers
const UserControllerFactory = require('./controllers/v1/users');
const ProdcutstControllerFactory = require('./controllers/v1/products');
const CategoryControllerFactory = require('./controllers/v1/categories');
const CustomerControllerFactory = require('./controllers/v1/customer');
const OrderControllerFactory = require('./controllers/v1/orders');
container.register({
  UserControllerFactory: asFunction(UserControllerFactory).singleton(),
  ProdcutstControllerFactory: asFunction(ProdcutstControllerFactory).singleton(),
  CategoryControllerFactory: asFunction(CategoryControllerFactory).singleton(),
  CustumerControllerFactory: asFunction(CustomerControllerFactory).singleton(),
  OrderControllerFactory: asFunction(OrderControllerFactory).singleton()
});
// RegisterServices
[
  'UserControllerFactory',
  'ProdcutstControllerFactory',
  'CategoryControllerFactory',
  'CustumerControllerFactory',
  'OrderControllerFactory'
].forEach(ctr => container.resolve(ctr));

const setupController = container.resolve('setupController');
const initDIContainer = (app) => {
  const scope = scopePerRequest(container);
  setupController.makeInvoker();
  app.use(scope);
};

const initRoutes = (app) => {
  setupController.initRoutes(app);
};

module.exports = { container, initDIContainer, initRoutes, routers };
