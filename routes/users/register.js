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


function getIdentiNumber(){
    return new Promise( async function(resolve, reject){    
            while(1){
                const _param = Math.floor(1000+ Math.random() * 9000);
                var r = await db.Query('select EXISTS (select * from users where auth_num = ?) as success',_param);
                if(r[0].success==0){
                    resolve(_param);
                    break;
                }    
            }
    });
}


/*
 Method : Get
*/


/*
 Method : Post
*/

router.post('/register_form', async(req, res, next)=>{
    var user = '123';
    let result = await db.Query('select * from users where status = 0 ORDER BY RAND() LIMIT 1');
    var userId = result[0].account_key;
    var idx = result[0].idx;
    var parmas1 = [1, idx];
    await db.Query('update users set status = ? where idx = ?', parmas1);

    var parmas2 = [];
    var _result = await getIdentiNumber();
    parmas2.push(_result);
    parmas2.push(idx);
    
    await db.Query('update users set auth_num = ? where idx =?', parmas2);
    res.render('register',{
        userId : userId
    });
});


module.exports = router;