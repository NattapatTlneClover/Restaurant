const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  full_name: {
    type: Sequelize.STRING,
  },
  employee_code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'admin',
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  tableName: 'admins',
  timestamps: false,
});

module.exports = User;