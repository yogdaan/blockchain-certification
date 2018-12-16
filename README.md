# Certificate Generation and Validation Using Blockchain

> Built using Ethereum on local blockchain setup and deployed on Rinkeby test network.

#### Steps to run after changing a smart contract:

> Always keep notice that we cannot simply assign values to variable from smart contracts because of the asynchronous nature. So we have to use promises to do that.

1. We need to re-deploy our smart contract in the block chain so we have to migrate it with the command `truffle migrate --reset` This resets the smart contract on the blockchain.

1. We can check the deployed smart contract by running `truffle console`.

1. In the console we have to first create an **app** variable with the running instance of the block chain. So for that run
    ```javascript
    Election.deployed().then(i => { newInstance = i });
    ```

1. For converting a BigNumber to JS integer use
    ```javascript
    anyBigNumber.toNumber()
    ```

1. Assigning a value can be done using promise or then() function.
    ```javascript 
    app.getData('507f1f77bcf86cd799439011').then(data => tuple =  data)
    ```

1. For accessing accounts you can use `web3.eth.accounts`. This will return array of accounts available.

1. For calling functions that write to the blockchain we have to use the above mentioned accounts. We can call functions like this
    ```javascript
    newInstance.generateCertificate(
      certificate_id,
      candidate_id,
      org_id,
      expiration_date,
      {
        from: web3.eth.accounts[0]
      }
    );
    ```

## Deploying Smart Contract

The contract can be deployed in any test networks. We are using Rinkeby test network with help of truffle.

1. First of all we need to have a metamask account. When we create an account in metamask a _mnemonic_ is given to us. [You can read how to get a mnemonic here.](https://support.dex.top/hc/en-us/articles/360004125614-How-to-Create-Mnemonic-Phrase-with-MetaMask-)

1. After that create a project in [Infura](https://infura.io). This will help us to use rinkeby network through infura.

1. You will get an endpoint like this  `https://rinkeby.infura.io/yourapikey`.
1. Create a `.env` file in root directory and paste the previously genrated mnemonic and the endpoint URL in that. An example is also provided in [.env.example](./.env.example) file.
    > For running in development environment and to use local blockchain network, use the LOCAL_ENDPOINT variable and replace the URL with your own local URL.

1. Now you can deploy the smart contract using a single command: 
    ```BASH
    npm run deploy
    ```

1. You will get a contract address of newly generated contract. Save this for further uses.

## Testing app

To test the app run the command `truffle test`
