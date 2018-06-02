/*
 default module
*/
const express = require('express');
const router = express.Router();

// Main
const register = require('./register');
router.use('/', register);

module.exports = router;
