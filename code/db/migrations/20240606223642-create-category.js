'use strict';

const { DataTypes, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  CATEGORY_TABLE: 'categories',
  categorySchema: {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
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
      defaultValue: Sequelize.NOW
    }
  },
  async up (queryInterface) {
    await queryInterface.createTable(this.CATEGORY_TABLE, this.categorySchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(this.CATEGORY_TABLE);
  }
};
