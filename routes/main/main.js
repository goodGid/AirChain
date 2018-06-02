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

router.get('/',function(req,res){
    res.render('index');
});

router.get('/main',function(req,res){
    res.render('main');
});

router.get('/getAccounts', (req, res) => {
    console.log("**** GET /getAccounts ****");
    truffle_connect.start(function (answer) {
      res.send(answer);
    })
});


/*
 Method : Post
*/
router.post('/login', async(req,res,next) => {
    console.log(' here ');

    const user_id = req.body.id;
    const password = req.body.password;

    let selectID =
    `
    SELECT id
    FROM users
    WHERE id = ? and password = ?
    `;

    let result = await db.Query(selectID,[user_id,password]);
    if(result.length != 0){
        res.redirect('/main');
    }
    else{
        res.redirect('/');
    }
})


router.post('/getBalance', (req, res) => {
    console.log("**** GET /getBalance ****");
    console.log(req.body);

    let currentAcount = req.body.account;
    truffle_connect.refreshBalance(currentAcount, (answer) => {
        let account_balance = answer;
        truffle_connect.start(function(answer){
            // get list of all accounts and send it along with the response
            let all_accounts = answer;
            response = [account_balance, all_accounts]
            res.send(response);
    });
});
});
  
  
  
router.post('/sendCoin', (req, res) => {
    console.log("**** GET /sendCoin ****");
    console.log(req.body);
  
    let amount = req.body.amount;
    let sender = req.body.sender;
    let receiver = req.body.receiver;
  
    truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
      res.send(balance);
    });
});
  
module.exports = router;