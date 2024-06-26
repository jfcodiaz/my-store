const winston = require('winston');
const { format } = winston;
const loggingEnabled = process.env.LOGGING_ENABLED === 'true';
const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
const transports = [];
if (loggingEnabled) {
  if (process.env.NODE_ENV === 'production') {
    transports.push(new winston.transports.File({ filename: 'app.log' }));
  } else {
    transports.push(new winston.transports.Console());
  }
}

const logger = loggingEnabled ? winston.createLogger({
  level: level,
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: transports
}) : {
  log: () => {},
  error: () => {},
  info: () => {},
  debug: () => {}
};

module.exports = logger;
