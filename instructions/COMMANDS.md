# Steps to run after changing a smart contract:

Some instructions to run if debugging in truffle console.

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
