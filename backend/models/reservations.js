const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Table = require('./table');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reservation_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  table_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Table,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  reservation_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Reservations',
  timestamps: false
});

module.exports = Reservation;
