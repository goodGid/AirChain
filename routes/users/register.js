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

router.post('/register_form', async(req, res, next)=>{
    var user = '123';
    let result = await db.Query('select * from users where id = ?', user);
    var userId = result[0].idx;
    console.log("테스트 : " + userId);
  

    res.render('register',{
        userId : userId
    });
});


  
module.exports = router;