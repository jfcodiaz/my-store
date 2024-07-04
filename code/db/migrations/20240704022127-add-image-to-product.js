'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { PRODUCT_TABLE } = require('./20240607044055-create-products');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  imageSchema: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: ''
  },
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(PRODUCT_TABLE, 'image', this.imageSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'image')
  }
};
