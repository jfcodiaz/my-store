const expres = require('express');

const productsRouter = require('./products.routes');
const categoriesRouter = require('./categories.routes');
const userRouter = require('./users.route');
const customers = require('./customer.router');
const orderRouter = require('./orders.routes');
const authRoute  = require('./auth.router');
const profileRouter = require('./profile.router');

function routeApi(app) {
  const router = expres.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/customers', customers);
  router.use('/categories', categoriesRouter);
  router.use('/users', userRouter);
  router.use('/orders', orderRouter);
  router.use('/auth', authRoute);
  router.use('/profile', profileRouter);
}

module.exports = routeApi;
