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
  //dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
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
  // Get the initial account balance so it can be displayed.
  return new Promise((resolve, reject) => {
    self.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        reject(err);
      } else if (accs.length == 0) {
        reject(
          "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
        );
      } else {
        self.accounts = accs;
        self.account = self.accounts[0];
        resolve(self.accounts);
      }
    });
  });
};

const getCertificateData = function(account) {
  var self = this;

  // Bootstrap the CertificationInstance abstraction for Use.
  CertificationInstance.setProvider(self.web3.currentProvider);

  return CertificationInstance.deployed()
    .then(ins => ins.getData(account))
    .catch(err => Promise.reject("No certificate found with the input id"));
};

const sendCoin = function(amount, sender, receiver, callback) {
  var self = this;

  // Bootstrap the CertificationInstance abstraction for Use.
  CertificationInstance.setProvider(self.web3.currentProvider);

  var meta;
  CertificationInstance.deployed()
    .then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, { from: sender });
    })
    .then(function() {
      self.refreshBalance(sender, function(answer) {
        callback(answer);
      });
    })
    .catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
};

module.exports = {
  connectWeb3,
  getAccounts,
  getCertificateData,
  sendCoin
};
