import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import {
  Heading, Stack, Box, useClipboard, Input, Button, Flex,
} from '@chakra-ui/core';
import SupporterFunds from './supporterFunds';
// import SupporterGiveaways from './supporterGiveaways';
import SupporterLevel from './supporterLevel';

// ABI Imports
import ERC20ABI from '../abi/ERC20';
import LendingPoolAddressProviderABI from '../abi/LendingPoolAddressesProvider';
import LendingPoolABI from '../abi/LendingPool';

function Supporter() {

  const [web3, setWeb3] = useState(null);
  const [myAddress, setMyAddress] = useState(null);

  useEffect(() => {

    async function getAccount() {

      const web3Instance = new Web3(window.ethereum);
      window.ethereum.enable();
      window.web3 = web3Instance;

      setWeb3(web3Instance);
      const address = (await web3Instance.eth.getAccounts())[0];
      console.log('Wallet Address: ' + address);
      setMyAddress(address);

    }
    getAccount()

  },[])

  // Create the LendingPoolAddressProvider contract instance
  function getLendingPoolAddressProviderContract() {
    const lpAddressProviderAddress = "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728" // ropsten test net address, for other addresses: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
    const lpAddressProviderContract = new web3.eth.Contract(LendingPoolAddressProviderABI, lpAddressProviderAddress)
    return lpAddressProviderContract
  }

  // Get the latest LendingPoolCore address
  async function getLendingPoolCoreAddress() {
    const lpCoreAddress = await getLendingPoolAddressProviderContract()
      .methods.getLendingPoolCore()
      .call()
      .catch((e) => {
        throw Error(`Error getting lendingPool address: ${e.message}`)
      })

    console.log("LendingPoolCore address: ", lpCoreAddress)
    return lpCoreAddress
  }

  // Get the latest LendingPool address
  async function getLendingPoolAddress() {
    const lpAddress = await getLendingPoolAddressProviderContract().methods
      .getLendingPool()
      .call()
      .catch((e) => {
        throw Error(`Error getting lendingPool address: ${e.message}`)
      })
    console.log("LendingPool address: ", lpAddress)
    return lpAddress
  }

  /**
   * Deposit DAI into Aave to receive the equivalent aDAI
   * Note: User must have DAI already in their wallet!
   */
  async function deposit() {
    const daiAmountinWei = web3.utils.toWei("1000", "ether").toString()
    // const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F" // mainnet DAI
    // const daiAddress = "0xad6d458402f60fd3bd25163575031acdce07538d" // testnet DAI
    const ethAdress = "0x722dd3f80bac40c951b51bdd28dd19d435762180" // testnet ETH
    const referralCode = "0"

    try {
      const lpCoreAddress = await getLendingPoolCoreAddress()

      // Approve the LendingPoolCore address with the DAI contract
      const ethContract = new web3.eth.Contract(ERC20ABI, ethAdress)
      await ethContract.methods
        .approve(lpCoreAddress, daiAmountinWei)
        .send({ from: myAddress })
        .catch((e) => {
          throw Error(`Error approving DAI allowance: ${e.message}`)
        })

      // Make the deposit transaction via LendingPool contract
      const lpAddress = await getLendingPoolAddress()
      const lpContract = new web3.eth.Contract(LendingPoolABI, lpAddress)
      await lpContract.methods
        .deposit(ethAdress, daiAmountinWei, referralCode)
        .send({ from: myAddress })
        .catch((e) => {
          throw Error(`Error depositing to the LendingPool contract: ${e.message}`)
        })
    } catch (e) {
      alert(e.message)
      console.log(e.message)
    }
  }

  if (myAddress != null) {
    // wallet connected
    return (
      <div>
        <button className="App-button" onClick={async () => await deposit()}>
          Deposit
        </button>
        <SupporterLevel supportLevel="1090" />
        <SupporterFunds frequency="week" amounts={[1, 5, 10]} />
        {/* <SupporterGiveaways totalRaised="752.11 DAI" numSupporters="21" /> */}
      </div>
    );
  } else {
    // error in connecting wallet / error in connecting wallet
    return (
      <Stack
        ml="300px"
        mr="300px"
        mt="100px"
        border={30}
        borderRadius={40}
        borderWidth="20px"
        backgroundColor="whiteAlpha.500"
        opacity={1}
        shadow="md"
      >
      <Heading padding="20px" textAlign="center" paddingBottom="0px">Please connect a wallet such as Metamask to proceed</Heading>
    </Stack>
    );
  }

}

export default Supporter;
