/*
 Default module
*/
const express = require('express');
const router = express.Router();

// Main Page
const main_page = require('./main/main_routes');
router.use('/', main_page);

module.exports = router;
