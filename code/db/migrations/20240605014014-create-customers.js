'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  CUSTOMER_TABLE: 'customers',
  customerSchemaV1: {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'last_name'
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING
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
    userId: {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: USER_TABLE,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    }
  },

  async up (queryInterface) {
    await queryInterface.createTable(
      this.CUSTOMER_TABLE,
      this.customerSchemaV1
    );
  },

  async down (queryInterface) {
    await queryInterface.dropTable(this.CUSTOMER_TABLE);
  }
};
