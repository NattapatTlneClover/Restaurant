const sequelize = require('../config/database');
const Reservation = require('../models/reservations');
const { v4: uuidv4 } = require('uuid');

// Get all reservations
exports.getAllreservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findAll();
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create reservation
exports.createReservation = async (req, res, next) => {
console.log('req.body:', req.body);
  try {
    let { customer_name, table_id } = req.body;

    if (!customer_name || !table_id) {
      return res.status(400).json({ error: 'customer_name และ table_id ต้องมีค่า' });
    }

    // กำหนด status เป็น pending เสมอ ไม่รับจาก client
    const status = 'pending';

    const reservationCode = uuidv4().slice(0, 8);
    const now = new Date();

    const reservation = await Reservation.create({
      customer_name,
      table_id,
      reservation_code: reservationCode,
      reservation_time: now,
      status,
      created_at: now,
      updated_at: now,
    });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete reservation
exports.deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Reservation.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: 'Reservation deleted successfully' });
    } else {
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
