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
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = MenuItem;
