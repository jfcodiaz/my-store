const authRoute = require('./auth.router');
const profileRouter = require('./profile.router');
const { routers } = require('../container');

function routeApi (app, initRoutes) {
  initRoutes(app);
  const router = routers.v1[1];
  router.use('/auth', authRoute);
  router.use('/profile', profileRouter);
}

module.exports = routeApi;
