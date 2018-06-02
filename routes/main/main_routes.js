/*
 default module
*/
const express = require('express');
const router = express.Router();

// Main
const main = require('./main');
router.use('/', main);

module.exports = router;
