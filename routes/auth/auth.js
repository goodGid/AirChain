/*
 Declare module
 */
const express = require('express');
const router = express.Router();
const async = require('async');
const db = require('../../module/pool.js');
const QRCode = require('qrcode');



/*
 Method : Get
*/


/*
 Method : Post
*/

router.post('/',function(req,res){
    res.render('auth');
});

app.get('/:qrcode',(req, res) =>{

    let inputStr = req.params.qrcode;

    QRCode.toDataURL(inputStr, function (err, url) {


        let data = url.replace(/.*,/,'')
        let img = new Buffer(data,'base64')
        res.writeHead(200,{
            'Content-Type' : 'image/png',
            'Content-Length' : img.length
        })
        res.end(img)

    })


})


router.post('/create_qrcode',function(req,res){

    let inputStr = "test";

    QRCode.toDataURL(inputStr, function(err , url){

        let data = url.replace(/.*,/,'')
        let img = new Buffer(data,'base64')
        res.writeHead(200,{
            'Content-Type' : 'image/png',
            'Content-Length' : img.length
        })
        res.end(img)
    });
});

module.exports = router;