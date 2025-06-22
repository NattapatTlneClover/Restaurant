const path = require('path');
const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuitemcontroller');

//Validation  + multer
const { body } = require('express-validator');
const upload = require('../middleware/multer');

//GET
router.get('/', menuItemController.getAllMenuItems);

//POST
router.post('/',
    upload.single('image'), // Multer สำหรับรูป
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({ min: 0 }).withMessage('Price must be a number >= 0'),
        body('category').notEmpty().withMessage('Category is required'),
    ],
    menuItemController.createNewMenuItem);

//PUT
router.put('/:id',upload.single('image'), menuItemController.updateMenuitem);

//Delete
router.delete('/:id', menuItemController.deleteMenuItem);

module.exports = router;