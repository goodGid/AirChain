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

router.get('/qr_scanner',function(req,res){
    res.render('qr_scanner');
});


/*
 Method : Post
*/

router.post('/',function(req,res){
    res.render('auth');
});


router.post('/check_qr_code', async(req,res,next) => {
    const qr_code = req.body.qr_code;

    let selectQRCode =
    `
    SELECT count(*) as cnt
    FROM book_list
    WHERE id = ?
    `;

    let result = await db.Query(selectQRCode,[qr_code]);
    if(result[0].cnt > 0){
        res.send("Success");
    }
    else{
        res.send("Fail");
    }
})


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

        let insertQuery =
        `
        INSERT INTO qr_code(value)
        VALUES (?)
        `;

        db.Query(insertQuery,[data]);

        let img = new Buffer(data,'base64')
        res.writeHead(200,{
            'Content-Type' : 'image/png',
            'Content-Length' : img.length
        })
        res.end(img)
    });
});

module.exports = router;