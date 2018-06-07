/*
 Declare module
 */
const express = require('express');
const router = express.Router();
const async = require('async');
const bodyParser = require('body-parser');
const db = require('../../module/pool.js');

const airport_truffle_connect = require('../../connection/bc_airport.js');
const meta_truffle_connect = require('../../connection/bc_metacoin.js');

/*
 Method : Get
*/

router.get('/',function(req,res){
    res.render('index');
});

router.get('/main/:userIdx&:userLevel&:account_key',function(req,res){

    let userIdx = req.params.userIdx;
    let userLevel = req.params.userLevel;
    let account_key = req.params.account_key

    res.render('book',{
        userIdx : userIdx,
        userLevel : userLevel,
        sender : account_key
    });
});


router.get('/main2',function(req,res){
    res.render('main');
});


/*
 Method : Post
*/

router.post('/login', async(req,res,next) => {
    const user_id = req.body.id;
    const password = req.body.password;

    let selectID =
    `
    SELECT idx, level, account_key
    FROM users
    WHERE id = ? and password = ?
    `;

    let result = await db.Query(selectID,[user_id,password]);
    if(result.length != 0){
        res.redirect('/main/' + result[0].idx + "&" + result[0].level + "&" + result[0].account_key);
    }
    else{
        res.redirect('/');
    }
})


router.post('/book', (req, res) => {
    console.log("**** GET /book ****");
  
    let countryId = req.body.countryId;
    let userIdx = req.body.userIdx;
    let sender = req.body.sender;

    console.log('sender : ' + sender);
  
    airport_truffle_connect.chkBook(countryId, userIdx, sender, (result) => {
        console.log(' [router -> main.js] res : ' + result);
      res.send({result});
    });
});





/*
    Meta Coin
*/



router.get('/getAccounts', (req, res) => {
    console.log("**** GET /getAccounts ****");
    meta_truffle_connect.start(function (answer) {
        console.log('answer : ' + answer);
      res.send(answer);
    })
});



router.post('/getBalance', (req, res) => {
    console.log("**** GET /getBalance ****");
    console.log(req.body);

    let currentAcount = req.body.account;
    meta_truffle_connect.refreshBalance(currentAcount, (answer) => {
        let account_balance = answer;
        meta_truffle_connect.start(function(answer){
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
  
    meta_truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
      res.send(balance);
    });
});
  


module.exports = router;