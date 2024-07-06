const setupModels = require('./models');
const logger = require('../libs/logger');
const { Sequelize } = require('sequelize');
const { config } = require('../config/config');

const options = {
  dialect: 'postgres',
  logging: config.env === 'dev' ? logger.info : false
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;
