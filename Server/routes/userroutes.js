const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usercontroller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/check-email/:email', UserController.checkEmail);


module.exports = router;
