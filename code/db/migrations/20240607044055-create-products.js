'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  PRODUCT_TABLE: 'products',
  productSchema: {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: null
    },
    categoryId: {
      field: 'category_id',
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: CATEGORY_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  },

  async up (queryInterface) {
    queryInterface.createTable(this.PRODUCT_TABLE, this.productSchema);
  },

  async down (queryInterface) {
    queryInterface.dropTable(this.PRODUCT_TABLE);
  }
};
