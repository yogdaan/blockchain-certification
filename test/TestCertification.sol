pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Certification.sol";

contract TestCertification {

  function testInitialLengthOfDeployedContract() public {
    Certification instance = Certification(DeployedAddresses.Certification());
    string memory x;
    uint256 y;
    uint256 z;
    (x,y,z) = instance.getData("garbage");
    Assert.equal(x, "", "Candidate id should be an empty string for non-registered certificate");
    Assert.equal(y, 0, "Organisation id should be zero for non-registered certificate");
    Assert.equal(z, 0, "Expiration time should be zero for non-registered certificate");
  }
}
