var AEWall = artifacts.require("./AEWall.sol");
var TestToken = artifacts.require("./TestToken.sol");

module.exports = function(deployer) {
  deployer.deploy(AEWall);
  deployer.deploy(TestToken);
};
