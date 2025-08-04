const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const OrderGroup = sequelize.define('order_groups', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  table_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'tables',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  status: {
    type: Sequelize.ENUM('active', 'closed'),
    defaultValue: 'active',
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  expired_at: {
    type: Sequelize.DATE,
    allowNull: true,
  },
}, {
  tableName: 'order_groups',
  timestamps: false,
});

module.exports = OrderGroup;
