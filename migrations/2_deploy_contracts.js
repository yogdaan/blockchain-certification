var Certification = artifacts.require("./Certification.sol");

module.exports = function(deployer) {
  deployer.deploy(Certification);
};
