const { Sequelize } = require('sequelize');

const { config } = require('../config/config');

const setupModels = require('../db/models');
const logger = require('./logger');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false: msj => logger.info(msj)
}

if(config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;
