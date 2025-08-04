const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const OrderGroup = require('./order_group');
const Table = require('./table');

const Order = sequelize.define('Order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  table_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Table,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  order_group_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: OrderGroup,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  total_price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('pending', 'confirmed', 'canceled', 'completed'),
    defaultValue: 'pending',
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'orders',
  timestamps: false,
});

module.exports = Order;