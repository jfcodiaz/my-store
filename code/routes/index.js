const expres = require('express');

const authRoute = require('./auth.router');
const userRouter = require('./users.route');
const customers = require('./customer.router');
const orderRouter = require('./orders.routes');
const profileRouter = require('./profile.router');
const productsRouter = require('./products.routes');
const categoriesRouter = require('./categories.routes');

function routeApi (app) {
  const router = expres.Router();
  app.use('/api/v1', router);

  router.use('/auth', authRoute);
  router.use('/users', userRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customers);
  router.use('/profile', profileRouter);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routeApi;
