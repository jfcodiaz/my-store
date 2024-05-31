const expres = require("express");
const routeApi = require('./routes')


const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')


const app = expres();
const port = 3000;

app.use(expres.json())
routeApi(app);
app.get('/', (req, res) => {
  res.status(201).send('Hola mi server en express')
});

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server on ${port}`)
})
