const path = require('path');
const express = require('express');
const router = express.Router();
const userAdminController = require('../controllers/useradmincontroller');
const upload = require('../middleware/multer');
const { verifyToken } = require('../middleware/authmiddleware');

router.post('/register', upload.none(), userAdminController.registerAdmin);
router.post('/login', upload.none(), userAdminController.loginadmin);
router.post('/refresh-token', upload.none(), userAdminController.refreshToken);
router.post('/logout', upload.none(), userAdminController.logout);

module.exports = router;
