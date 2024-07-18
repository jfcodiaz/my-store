const authRoute = require('./auth.router');
const customers = require('./customer.router');
const orderRouter = require('./orders.routes');
const profileRouter = require('./profile.router');
const { routers } = require('../container');

function routeApi (app, initRoutes) {
  initRoutes(app);
  const router = routers.v1[1];
  router.use('/auth', authRoute);
  router.use('/orders', orderRouter);
  router.use('/customers', customers);
  router.use('/profile', profileRouter);
}

module.exports = routeApi;
