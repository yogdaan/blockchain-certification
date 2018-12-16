const web3 = require("web3");
var Certification = artifacts.require("./Certification.sol");

contract("Certification", accounts => {
  let obj = {};

  it("generates a certificate with correct data", () =>
    Certification.deployed()
      .then(instance => {
        obj.candidateName = "Saurabh Thakur";
        obj.orgName = "Udacity";
        obj.courseName = "Full Stack Nanodegree";
        obj.expirationDate = new Date().getTime();
        obj.instance = instance;
        obj.id = "5c0157fd3ff47a2a54075b01";
        return instance.generateCertificate(
          obj.id,
          obj.candidateName,
          obj.orgName,
          obj.courseName,
          obj.expirationDate,
          {
            from: accounts[0]
          }
        );
      })
      .then(receipt => {
        assert.equal(receipt.logs.length, 1, "an event was triggered");
        assert.equal(
          receipt.logs[0].event,
          "certificateGenerated",
          "the event type is correct"
        );
        assert.equal(
          web3.utils.toAscii(receipt.logs[0].args._certificateId).slice(0, 24),
          obj.id,
          "the certificate id is correct"
        );
        return obj.instance.getData(obj.id);
      })
      .then(certificateInfo => {
        assert.equal(
          certificateInfo[0],
          obj.candidateName,
          "the name of the candidate is correct"
        );
        assert.equal(
          certificateInfo[1],
          obj.orgName,
          "the name of the organisation is correct"
        );
        assert.equal(
          certificateInfo[2],
          obj.courseName,
          "the name of the course is correct"
        );
        assert.equal(
          certificateInfo[3],
          obj.expirationDate,
          "the expiration date is correct"
        );
      }));

  it("throws an exception for invalid candidate ids", () =>
    Certification.deployed()
      .then(instance => {
        return instance.getData("5c0157fd3ff47a2a54075b02");
      })
      .then(assert.fail)
      .catch(error => {
        assert(
          error.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
      }));

  it("throws an exception if new certificate is generated with the duplicate certificate id", () =>
    Certification.deployed().then(instance => {
      instance.generateCertificate(
        obj.id,
        obj.candidateName,
        obj.orgName,
        obj.courseName,
        obj.expirationDate,
        {
          from: accounts[0]
        }
      );
      instance
        .generateCertificate(
          obj.id,
          obj.candidateName,
          obj.orgName,
          obj.courseName,
          obj.expirationDate,
          {
            from: accounts[0]
          }
        )
        .then(assert.fail)
        .catch(error => {
          assert(
            error.message.indexOf("revert") >= 0,
            "error message must contain revert"
          );
        });
    }));
});
