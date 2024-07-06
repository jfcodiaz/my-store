'use strict';

const { DataTypes } = require('sequelize');
const { PRODUCT_TABLE } = require('./20240607044055-create-products');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  imageSchema: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: ''
  },
  async up (queryInterface) {
    await queryInterface.addColumn(PRODUCT_TABLE, 'image', this.imageSchema)
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'image')
  }
};
