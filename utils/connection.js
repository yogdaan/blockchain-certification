const Web3 = require("web3");
const contract = require("truffle-contract");
const HDWalletProvider = require("truffle-hdwallet-provider");

const log = require("../utils/Log");
const certification_artifact = require("../build/contracts/Certification.json");

const CertificationInstance = contract(certification_artifact);

module.exports = {
  connectWeb3: function() {
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
    process.env.NODE_ENV === "development"
      ? log.Print("Current host: " + self.web3.currentProvider.host)
      : log.Print(
          "Current host: " +
            self.web3.currentProvider.engine._providers[2].provider.host
        );
  },
  start: function() {
    const self = this;
    // Bootstrap the MetaCoin abstraction for Use.
    CertificationInstance.setProvider(self.web3.currentProvider);
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
  },
  refreshBalance: function(account, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed()
      .then(function(instance) {
        meta = instance;
        return meta.getBalance.call(account, { from: account });
      })
      .then(function(value) {
        callback(value.valueOf());
      })
      .catch(function(e) {
        console.log(e);
        callback("Error 404");
      });
  },
  sendCoin: function(amount, sender, receiver, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed()
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
  }
};
