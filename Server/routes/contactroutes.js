const express = require('express');
const ContactController = require('../controllers/contactcontroller');
const router = express.Router();


router.post('/', ContactController.addContact);

module.exports = router;
