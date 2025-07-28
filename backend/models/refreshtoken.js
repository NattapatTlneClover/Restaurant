const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const RefreshToken = sequelize.define('RefreshToken', {
    token: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
    expiryDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});

module.exports = RefreshToken;