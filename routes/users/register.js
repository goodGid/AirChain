/*
 Declare module
 */
const express = require('express');
const router = express.Router();
const async = require('async');
const bodyParser = require('body-parser');
const db = require('../../module/pool.js');

const Web3 = require('web3');
const truffle_connect = require('../../connection/app.js');

/*
 Method : Get
*/


/*
 Method : Post
*/

router.post('/register_form', function (req, res, next){
    res.render('register');
});


  
module.exports = router;