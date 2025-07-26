const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontroller');
const upload = require('../middleware/multer');

router.post('/', upload.none(), orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.get('/', orderController.getAllOrders);

module.exports = router;
