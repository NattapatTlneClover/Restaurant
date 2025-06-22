const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Table = sequelize.define('table', {
  tableId: {
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
    allowNull: true // ยังไม่จองก็ว่างไว้ได้
  }
}, {
  timestamps: true
});

module.exports = Table;
