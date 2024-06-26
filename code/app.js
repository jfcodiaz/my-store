const express = require("express");
const routeApi = require('./routes')
require('./utils/auth');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./middlewares/error.handler');
const { config } = require("./config/config");
const logger = require("./libs/logger");

let app;
let server;

const getApp = () => app;
const getServer = () => server;

const createApp = () => {
  app = express();
  const port = config.port;
  app.use(express.json())
  routeApi(app);
  app.get('/', (req, res) => {
    res.send('Hola mi server en express');
  });
  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);
  server = app.listen(port, () => {
    logger.info(`Server on ${port}`)
  })
}

module.exports = {
  createApp,
  getApp,
  getServer
}
