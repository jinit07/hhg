const LendingPlatform = artifacts.require("LendingPlatform");

module.exports = function (deployer) {
  deployer.deploy(LendingPlatform);
};
