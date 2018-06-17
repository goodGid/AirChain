var Airport = artifacts.require("./Airport.sol");

module.exports = function(deployer) {
  deployer.deploy(Airport);
};
