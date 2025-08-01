const path = require('path');
const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tablecontroller');
//Validation  + multer
const upload = require('../middleware/multer');

//GET
router.get('/', tableController.getAllTables);

//POST
router.post('/', upload.single('image'), tableController.createTable);

//PUT
router.put('/:id', upload.single('image'), tableController.updateTable);

//PUT
router.put('/:id/reserve', tableController.reserveTable);

//PUT
router.put('/:id/unreserve', tableController.unreserveTable);

//Delete
router.delete('/:id', tableController.deleteTable);

//Post
router.post('/CredentialLogin', upload.none(), tableController.loginWithCredential);

module.exports = router;
