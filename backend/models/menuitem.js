const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const MenuItem = sequelize.define('menuItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isSignature: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,  // <-- ใส่ที่นี่ใน options object
});

module.exports = MenuItem;
