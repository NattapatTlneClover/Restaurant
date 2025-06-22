const path = require('path');
const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

//GET
router.get('/', tableController.getAllTables);

//POST
router.post('/', tableController.createTable);

//PUT
router.put('/:id/reserve', tableController.reserveTable);

//PUT
router.put('/:id/unreserve', tableController.unreserveTable);

//Delete
router.delete('/:id', tableController.deleteTable);

module.exports = router;
