const Web3 = require("web3");
const contract = require("truffle-contract");
const HDWalletProvider = require("truffle-hdwallet-provider");

const log = require("../utils/log");
const certification_artifact = require("../build/contracts/Certification.json");

const CertificationInstance = contract(certification_artifact);

const connectWeb3 = function() {
  const self = this;
  if (process.env.NODE_ENV === "development") {
    self.web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.LOCAL_ENDPOINT)
    );
  } else {
    self.web3 = new Web3(
      new HDWalletProvider(process.env.MNEMONIC, process.env.PROJECT_ENDPOINT)
    );
  }

  CertificationInstance.setProvider(self.web3.currentProvider);
  // hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
  if (typeof CertificationInstance.currentProvider.sendAsync !== "function") {
    CertificationInstance.currentProvider.sendAsync = function() {
      return CertificationInstance.currentProvider.send.apply(
        CertificationInstance.currentProvider,
        arguments
      );
    };
  }

  process.env.NODE_ENV === "development"
    ? log.Print("Current host: " + self.web3.currentProvider.host)
    : log.Print(
        "Current host: " +
          self.web3.currentProvider.engine._providers[2].provider.host
      );
};

const getAccounts = function() {
  const self = this;

  return self.web3.eth.getAccounts();
};

const getCertificateData = function(certificateId) {
  const self = this;

  // Bootstrap the CertificationInstance abstraction for Use.
  CertificationInstance.setProvider(self.web3.currentProvider);

  return CertificationInstance.deployed()
    .then(ins => ins.getData(certificateId))
    .catch(err => Promise.reject("No certificate found with the input id"));
};

const generateCertificate = function(
  id,
  candidateName,
  orgName,
  courseName,
  expirationDate
) {
  const self = this;

  // Bootstrap the CertificationInstance abstraction for Use.
  CertificationInstance.setProvider(self.web3.currentProvider);

  return self.getAccounts().then(answer => {
    let accountAddress = answer[0];
    return CertificationInstance.deployed()
      .then(instance =>
        instance.generateCertificate(
          id,
          candidateName,
          orgName,
          courseName,
          expirationDate,
          { from: accountAddress.toLowerCase(), gas: 200000 }
        )
      )
      .catch(err => {
        log.Error(err);
        return Promise.reject(err.toString());
      });
  });
};

module.exports = {
  connectWeb3,
  getAccounts,
  getCertificateData,
  generateCertificate
};
