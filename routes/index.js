const expres = require('express');

const productsRouter = require('./products.routes')
//const categoriesRouter = require('./categories.routes')
//const userRouter = require('./users.route')
//const orderRouter = require('./orders.routes')

function routeApi(app) {
  const router = expres.Router();

  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  //router.use('/categories', categoriesRouter);
  //router.use('/users', userRouter)
  //router.use('/orders', orderRouter);
}


module.exports = routeApi;
