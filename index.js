const expres = require("express");
const routeApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./middlewares/error.handler')

const app = expres();
const port = process.env.PORT || 3000;

app.use(expres.json())
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
