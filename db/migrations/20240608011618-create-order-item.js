'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('../models/order.model');
const { PRODUCT_TABLE } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  ORDER_ITEM_TABLE: 'order_item',
  orderItemSchema: {
    id: {
      allowNull: false,
      autoIncrement:true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    orderId: {
      field: 'order_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: ORDER_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    productId: {
      field: 'product_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: PRODUCT_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  },
  async up (queryInterface, Sequelize) {
    queryInterface.createTable(this.ORDER_ITEM_TABLE, this.orderItemSchema);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable(this.ORDER_ITEM_TABLE);
  }
};

