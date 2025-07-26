const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Table = sequelize.define('Table', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  numberTable: {
    type: Sequelize.STRING,
    allowNull: false
  },
  chairQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isReserved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  reservedAt: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  tableName: 'tables',
  timestamps: false
});

module.exports = Table;
