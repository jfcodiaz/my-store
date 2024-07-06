const winston = require('winston');

const loggingEnabled = process.env.LOGGING_ENABLED === 'true';
const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
const { format } = winston;
const transports = [];

if (loggingEnabled) {
  if (process.env.NODE_ENV === 'production') {
    transports.push(new winston.transports.File({ filename: 'app.log' }));
  } else {
    transports.push(new winston.transports.Console());
  }
}

const logOff = () => ({
  log: () => {},
  error: () => {},
  info: () => {},
  debug: () => {}
});

const logger = loggingEnabled
  ? winston.createLogger({
    level,
    format: format.combine(
      format.timestamp(),
      format.json()
    ),
    transports
  })
  : logOff();

module.exports = logger;
