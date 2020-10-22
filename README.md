# SpringUp

Scope of project:

Supporter:
1. Download and run Raiden (Using the wizard is enough). https://docs.raiden.network/using-raiden-on-testnet/quick-start-on-goerli-testnet
  1.1 To use Raiden each user has to run their own Node on their local machine. In the future this will change with Raiden JS light client.
2. Open our dApp:
3. Showcase the Raiden ETH address using: http://localhost:5001/api/v1/address
  3.1 Reference: https://docs.raiden.network/raiden-api-1/resources/address
4. Clicking on this address (or a button next to it "FUND RAIDEN") will open up a MM transaction to fund the Raiden account with some ETH.
5. Clicking on a button ("DEPOSIT USDC/DAI") will do two things (Need to show loading while transactions are happening):
  5.1 First a transaction to Aave where we deposit our USDC/DAI and get back aUSDC/aDAI.
  5.2 After the first transaction is complete and we get back aUSDC/aDAI make a transaction to Raiden address with the aToken that we just received.
6. Now our Raiden Node is funded with aUSDC/aDAI.
7. To send payments to a supporter we make API calls like this: http://localhost:5001/api/v1/payments/0x2a65...8226/0x61C8...0bD9
  7.1 Reference: https://docs.raiden.network/raiden-api-1/resources/payments#initiate-a-payment


Creator:
1. 1. Download and run Raiden (Using the wizard is enough). https://docs.raiden.network/using-raiden-on-testnet/quick-start-on-goerli-testnet
  1.1 To use Raiden each user has to run their own Node on their local machine. In the future this will change with Raiden JS light client.
2. Open our dApp:
3. Showcase the Raiden ETH address using: http://localhost:5001/api/v1/address
  3.1 Reference: https://docs.raiden.network/raiden-api-1/resources/address
4. Clicking on this address (or a button next to it "FUND RAIDEN") will open up a MM transaction to fund the Raiden account with some ETH.
4.1 Now our Creator can receive funds from Supporters via Raiden.
5. The Creator now interacts with our Smart Contract.
6. The Creator wants to add supportLevels.
  6.1 Each supportLevel is a different amount of aUSDC/aDAI (We can also use an Oracle to convert this into USD)
7. The Creator fills out a form to create/update a supportLevel 
  7.1 The Creator fills out the secret that he wants to give to supporters: Can be a URL, Password etc. Could be an NFT but we don't have enough time to implement.
  7.2 The Creator fills out the "price" of the prize (In aUSDC/aDAI or USD if using Oracle)
  7.3 The Creator clicks a button ("CREATE SUPPORT_LEVEL") which calls the Smart Contract and adds this supportLevel to an array on chain.
8. To actually give the Supporters the secrets that they should receive the dApp of the Creator constantly makes calls to Raiden to check who supported him and how much:
  8.1 Using: http://localhost:5001/api/v1/payments/0x0f11...b1ED/0x8264...5ba7
  8.2 Reference: https://docs.raiden.network/raiden-api-1/resources/payments#payment-history
  8.3 If the dApp finds that a Supporter sent enough Payments over Raiden such that they deserve a supportLevel. A transaction is made onChain to add the address of Supporter to an array of verified Supporters per supportLevel.
