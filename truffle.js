// Allows us to use ES6 in our migrations and tests.
require("babel-register");
const HDWalletProvider = require("truffle-hdwallet-provider");
require("dotenv").config();
module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        console.log("mnemonic: " + process.env.MNEMONIC);
        return new HDWalletProvider(
          process.env.MNEMONIC,
          process.env.PROJECT_ENDPOINT
        );
      },
      network_id: 1
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777"
    }
  }
};
