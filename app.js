/*
 Default module
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const db = require('./module/pool');

const port = 3001;
const Web3 = require('web3');
const truffle_connect = require('./connection/bc_airport.js');
const routes = require('./routes/routes');



/*
 app.set
*/
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


/*
  app.use
*/
app.use(helmet());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public_static')));
app.use(bodyParser.urlencoded());
// app.use('/', express.static('public_static'));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/',routes);

app.use(function(req, res, next)
{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next)
{
  res.locals.message = err.message;
  // console.log("res.locals.message error : " + res.locals.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // console.log("res.locals.error error : " + res.locals.error);

  res.status(err.status || 500);
  res.render('error',{errLog : res.locals.error});
});

app.listen(port, () => {

  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    truffle_connect.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
  }
  console.log("Express Listening at http://localhost:" + port);

});


module.exports = app;