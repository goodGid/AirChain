/*
 Default module
*/
const express = require('express');
const router = express.Router();

// Auth
const auth = require('./auth');
router.use('/', auth);

module.exports = router;
