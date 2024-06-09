const express = require("express");
const routeApi = require('./routes')
require('./utils/auth');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

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
