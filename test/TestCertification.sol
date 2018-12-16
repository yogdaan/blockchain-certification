pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Certification.sol";

contract TestCertification {
  function testInitialLengthOfDeployedContract() public {
    Certification instance = Certification(DeployedAddresses.Certification());
    string memory x;
    string memory y;
    string memory z;
    uint256 i;

    (x, y, z, i) = instance.getData("garbage");

    Assert.equal(x, "", "Candidate id should be an empty string for non-registered certificate");
    Assert.equal(y, "", "Organisation name should be an empty string for non-registered certificate");
    Assert.equal(z, "", "Course name should be an empty string for non-registered certificate");
    Assert.equal(i, 0, "Expiration time should be zero for non-registered certificate");
  }
}
