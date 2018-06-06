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
router.post('/', async(req, res, next)=>{
    
    const userId = req.body.userId;
    const private_key = req.body.private_key;
    const userpw1 = req.body.userpw1;

    console.log('userId : ' + userId);
    console.log('private_key : ' + private_key);
    console.log('userpw1 : ' + userpw1);

    res.render('index');

});



router.post('/register_form', async(req, res, next)=>{
    let result = await db.Query('select * from users where status = 0 ORDER BY RAND() LIMIT 1');
    var userId = result[0].account_key;
    var identiKey = await getIdentiNumber();

    // await db.Query('update users set status = ? where idx = ?', parmas1);  
    // await db.Query('update users set auth_num = ? where idx =?', parmas2);



    res.render('register',{
        userId : userId,
        identiKey : identiKey
    });
});


module.exports = router;