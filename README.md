# Certificate Generation and Validation Using Blockchain

[![Docker Build](https://img.shields.io/docker/pulls/yogdaan/blockchain-certification?label=Docker%20Pulls&style=flat-square)](https://hub.docker.com/r/yogdaan/blockchain-certification)
[![Build Status](https://travis-ci.org/yogdaan/blockchain-certification.svg?branch=master)](https://travis-ci.org/yogdaan/blockchain-certification)
[![Join the chat at https://gitter.im/yogdaan/blockchain-certification](https://img.shields.io/gitter/room/certification-validation/community.js.svg?style=for-the-badge)](https://gitter.im/yogdaan/blockchain-certification)  
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

> Built using Ethereum on local blockchain setup and deployed on Rinkeby test network.

| Contract deployed at | 0x89c34c6a0d4c7587e9120a533757f380f4676887 |
| -------------------- | ------------------------------------------ |
| RPC Network          | Rinkeby Test Network                       |

## Steps to set up local development environment

### Setting local blockchain

1. We need to install CLI version of Ganache.

   ```bash
   npm install -g ganache-cli
   ```

   > Ganache provides us our personal local blockchain network which we can use to develop our blockchain application. It also gives temporary test accounts with fake ethereum which we can use to run our apps. We need to start the RPC server before running our application.

1. To start the RPC server run the command

   ```bash
   npm run ganache
   ```

   > Windows user will need to run this command in separate command prompt or terminal.

1. Deploy the smart contract to the local blockchain.

   ```bash
   npm run contract-deploy
   ```

> The above 2 steps need to be run everytime you are running the project.

### Setting local database

> MongoDB server should be running as a background Process

1. Open mongo in terminal using command `mongo`

1. Then change the db using command

   ```bash
   use certification
   ```

1. Then set DB user and password with the following command

   ```javascript
   db.createUser({
     user: "<YOUR USER NAME>",
     pwd: "<YOUR USER PASSWORD>",
     roles: [{ role: "dbOwner", db: "certification" }]
   });
   ```

1. Include these username and password in the `.env` file.

### Now we can start the server

```bash
npm start
```

## Deploying Smart Contract

The contract can be deployed in any test networks. We are using Rinkeby test network with help of truffle.

1. First of all we need to have a metamask account. When we create an account in metamask a _mnemonic_ is given to us. [You can read how to get a mnemonic here.](https://support.dex.top/hc/en-us/articles/360004125614-How-to-Create-Mnemonic-Phrase-with-MetaMask-)

1. After that create a project in [Infura](https://infura.io). This will help us to use rinkeby network through infura.

1. You will get an endpoint like this `https://rinkeby.infura.io/yourapikey`.

1. Create a `.env` file in root directory and paste the previously genrated mnemonic and the endpoint URL in that. An example is also provided in [.env.example](./.env.example) file.

   > For running in development environment and to use local blockchain network, use the LOCAL_ENDPOINT variable and replace the URL with your own local URL (These default values are filled already and shouldn't be changed unless until RPC server running on different port)

1. Now you can deploy the smart contract using a single command:

   ```BASH
   npm run deploy
   ```

1. You will get a contract address of newly generated contract. Save this for further uses.

## Testing app

To test the app run the command `truffle test`. RPC server should be running to run the tests.

## Useful reads

- [Some instructions and commands for debugging in Truffle Console](./instructions/COMMANDS.md)

## Youtube Video for better understanding of the project

[![youtube-picture](https://img.youtube.com/vi/pByqlMCx7Bk/maxresdefault.jpg)](https://www.youtube.com/watch?v=pByqlMCx7Bk)

---

| Developers                                             |                                                               |
| ------------------------------------------------------ | ------------------------------------------------------------- |
| [Saurabh Thakur](https://github.com/thakursaurabh1998) | ![st](https://avatars0.githubusercontent.com/u/18613564?s=50) |
