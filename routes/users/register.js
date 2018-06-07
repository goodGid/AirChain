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
                var r = await db.Query('select EXISTS (select * from users where id = ?) as success',_param);
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

    const privateKey = req.body.privateKey;
    const identiKey = req.body.identiKey;
    const userPW = req.body.userPW;

    let updateInfo =
    `  
    UPDATE users
    SET id = ?, password = ?, status = ?
    WHERE account_key = ?
    `;

    let result = await db.Query(updateInfo,[identiKey,userPW,1,privateKey]);
    res.render('index');
});



router.post('/register_form', async(req, res, next)=>{
    let result = await db.Query('select * from users where status = 0 ORDER BY RAND() LIMIT 1');
    var userId = result[0].account_key;
    var identiKey = await getIdentiNumber();

    res.render('register',{
        userId : userId,
        identiKey : identiKey
    });
});


module.exports = router;