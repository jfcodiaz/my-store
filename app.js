const express = require("express");
const routeApi = require('./routes')
require('./utils/auth');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./middlewares/error.handler');
const { config } = require("./config/config");

const createApp = () => {
  const app = express();
  const port = config.port;
  console.log(port);
  app.use(express.json())
  routeApi(app);
  app.get('/', (req, res) => {
    res.status(201).send('Hola mi server en express')
  });
  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);
  app.listen(port, () => {
    console.log(`Server on ${port}`)
  })
}

module.exports = createApp;
