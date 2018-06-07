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
        callback(res);
    }).catch(function(e) {
      console.log("Error : " + e);
      callback("ERROR 404");
    });

  },

  updateMyLevel: function(userIdx, userLevel, sender, callback){
    var self = this;

    // Bootstrap the Airport abstraction for Use.
    Airport.setProvider(self.web3.currentProvider);

    var air
    Airport.deployed().then(function(instance) {
      air = instance;
      return air.setUserLevel.call(userIdx, userLevel, {from: sender});
    }).then(function(res) {
        callback(res);
    }).catch(function(e) {
      console.log("Error : " + e);
      callback("ERROR 404");
    });
  },



  getCountryLevel: function(countryId, sender, callback){
    var self = this;

    // Bootstrap the Airport abstraction for Use.
    Airport.setProvider(self.web3.currentProvider);

    var air
    Airport.deployed().then(function(instance) {
      air = instance;
      return air.getCountryLevel.call(countryId, {from: sender});
    }).then(function(res) {
        callback(res);
    }).catch(function(e) {
      console.log("Error : " + e);
      callback("ERROR 404");
    });
  },

  setCountryLevel: function(countries, sender, callback){
    var self = this;

    // Bootstrap the Airport abstraction for Use.
    Airport.setProvider(self.web3.currentProvider);

    var air
    Airport.deployed().then(function(instance) {
      air = instance;
      return air.setCountryLevel.call(countries, {from: sender});
    }).then(function(res) {
        callback(res);
    }).catch(function(e) {
      console.log("Error : " + e);
      callback("ERROR 404");
    });
  }


}
