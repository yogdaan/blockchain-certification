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
  start: function(callback) {
    const self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    CertificationInstance.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        log.Error("There was an error fetching your accounts.");
        log.Error(err);
        return;
      }

      if (accs.length == 0) {
        log.Warning(
          "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
        );
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[0];

      callback(self.accounts);
    });
  }
};
