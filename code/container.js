const express = require('express');
const pluralize = require('pluralize');
const capitalize = require('capitalize');
const { models } = require('./db/sequelize');
const { config } = require('./config/config');
const { makeInvoker } = require('awilix-express');
const { scopePerRequest } = require('awilix-express');
const container = require('awilix').createContainer();
const { asClass, asValue, asFunction } = require('awilix');
const UserRepository = require('./services/repositories/user.repository');
const ProductRepository = require('./services/repositories/product.repository');
const RespositoriesHelpers = require('./services/repositories/common/repositoriesHelpers');
const sequelize = require('./libs/sequelize');
container.register({
  // Config
  config: asValue(config),
  sequelize: asValue(sequelize),
  // Third-party Libraries
  encrypt: asFunction(() => require('bcrypt')).singleton(),
  boom: asFunction(() => require('@hapi/boom')).singleton(),

  // Models
  userModel: asValue(models.User),
  productModel: asValue(models.Product),

  // Repositories
  respositoriesHelpers: asClass(RespositoriesHelpers).singleton(),
  userRepository: asClass(UserRepository).singleton(),
  productRepository: asClass(ProductRepository).singleton(),

  // Services
  getBasePath: asFunction(() => require('./services/get-base-path').getBasePath).singleton(),
  getAbsoluteUrl: asFunction(() => require('./services/get-base-path').getAbsoluteUrl).singleton()

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

// Controller Makers
const UserControllerMaker = require('./controllers/v1/users');
const ProdcutstControllerMaker = require('./controllers/v1/products');

container.register({
  UserControllerMaker: asFunction(UserControllerMaker).singleton(),
  ProdcutstControllerMaker: asFunction(ProdcutstControllerMaker).singleton()
});
// RegisterServices
[
  'UserControllerMaker',
  'ProdcutstControllerMaker'
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
