const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationcontroller');
const upload = require('../middleware/multer');

router.get('/', reservationController.getAllreservation);
router.post('/', upload.none(), reservationController.createReservation);
router.delete('/:id', reservationController.deleteReservation);
router.put('/:id/status', upload.none(), reservationController.updateReservation);

module.exports = router;