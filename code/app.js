require('./utils/auth');
const express = require('express');
const routeApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const { config } = require('./config/config');
const logger = require('./libs/logger');
const { getBasePathMiddlewares } = require('./services/get-base-path');
const { initDIContainer, initRoutes } = require('./container');

let app;
let server;

const getApp = () => app;
const getServer = () => server;

const createApp = () => {
  app = express();
  app.use(getBasePathMiddlewares);
  const port = config.port;
  app.use(express.json());
  initDIContainer(app);
  routeApi(app, initRoutes);
  app.get('/', (req, res) => {
    res.send('Hola mi server en express');
  });
  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);
  server = app.listen(port, () => {
    logger.info(`Server on ${port}`);
  });
};

module.exports = {
  getApp,
  createApp,
  getServer
};
