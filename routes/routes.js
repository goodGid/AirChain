/*
 Default module
*/
const express = require('express');
const router = express.Router();

// Main Page
const main_page = require('./main/main_routes');
router.use('/', main_page);

// Register
const Register = require('./users/users_routes');
router.use('/register', Register);

// Auth
const auth = require('./auth/auth_routes');
router.use('/auth', auth);

module.exports = router;
