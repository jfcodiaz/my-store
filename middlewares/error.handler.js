const { ValidationError } = require("sequelize");

const logErrors = (err, req, res, next) => {
  console.log(err);
  next(err)
}

function errorHandler(err, req, res) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function ormErrorHandler(err, req, res, next) {
  if(err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors.map(error => {
        delete error.instance;
        return error;
      })
    });
  }
  next(err)
}

module.exports = {
  logErrors, errorHandler, boomErrorHandler, ormErrorHandler
}
