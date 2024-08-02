const winston = require('winston');
const { config } = require('../config/config');
const { loggingEnabled } = { config };
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
let logger;

if (config.loggingEnabled && config.logger === 'console') {
  module.exports = {
    /* eslint-disable no-console */
    log: (...args) => console.log(...args),
    error: (...args) => console.log(...args),
    info: (...args) => console.log(...args),
    debug: (...args) => console.log(...args)
    /* eslint-enable no-console */
  };
} else {
  const logOff = () => ({
    log: () => {},
    error: () => {},
    info: () => {},
    debug: () => {}
  });

  logger = loggingEnabled
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
}
