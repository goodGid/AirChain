const contract = require('truffle-contract');

const Airport_artifact = require('../build/contracts/Airport.json');
var Airport = contract(Airport_artifact);

module.exports = {
  start: function(callback) {
    var self = this;

    // Bootstrap the Airport abstraction for Use.
    Airport.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];
      now_account = self.accounts[0];

      callback(self.accounts);
    });
  },

  chkBook: function(countryId,userIdx,sender,callback){
    var self = this;

    // Bootstrap the Airport abstraction for Use.
    Airport.setProvider(self.web3.currentProvider);

    var air
    Airport.deployed().then(function(instance) {
      air = instance;
      return air.chkBook.call(countryId,userIdx, {from: sender});
    }).then(function(res) {
      console.log('res : ' + res[0]);
        callback(res);
    }).catch(function(e) {
      console.log("Error : " + e);
      callback("ERROR 404");
    });

  },

  refreshBalance: function(account, callback) {
    var self = this;

    // Bootstrap the Airport abstraction for Use.
    Airport.setProvider(self.web3.currentProvider);

    var meta;
    Airport.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },


  sendCoin: function(amount, sender, receiver, callback) {
    var self = this;

    // Bootstrap the Airport abstraction for Use.
    Airport.setProvider(self.web3.currentProvider);

    var meta;
    Airport.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: sender});
    }).then(function() {
      self.refreshBalance(sender, function (answer) {
        callback(answer);
      });
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  }
}
