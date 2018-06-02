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


router.get('/', express.static('views'));


router.get('/2', (req, res) => {

    
    console.log('hello ?');
    truffle_connect.start(function (answer) {
        console.log(answer);
      res.send(answer);
    })
});


router.get('/getAccounts', (req, res) => {
    console.log("**** GET /getAccounts ****");
    truffle_connect.start(function (answer) {
        console.log(answer);
      res.send(answer);
    })
});


/*
 Method : Post
*/
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