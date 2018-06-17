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


router.post('/check_identiKey', async(req,res,next) => {
    const identiKey = req.body.identiKey;

    let selectIdentiKey =
    `
    SELECT count(*) as cnt
    FROM users
    WHERE id = ?
    `;

    let result = await db.Query(selectIdentiKey,[identiKey]);
    if(result[0].cnt == 1){
        res.send("Success");
    }
    else{
        res.send("Fail");
    }
})



router.post('/create_qrcode',function(req,res){
    const identiKey = req.body.identiKey;

    QRCode.toDataURL(identiKey, function(err , url){
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