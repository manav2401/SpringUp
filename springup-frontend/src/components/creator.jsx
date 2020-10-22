import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Web3 from 'web3';
import {
  Heading,
  Stack,
  Box,
  useClipboard,
  Input,
  Button,
  Flex,
} from '@chakra-ui/core';

import CreatorShare from './creatorShare';
import CreatorFunds from './creatorFunds';
import CreatorGiveaways from './creatorGiveaways';

// ABI Imports
import ERC20ABI from '../abi/ERC20.json';
import LendingPoolAddressProviderABI from '../abi/LendingPoolAddressesProvider.json';
import LendingPoolABI from '../abi/LendingPool.json';
import minABI from '../abi/minABI.json';
import SupporterAccount from './supporterAccount';

const ropstenEthTokenAddress = '';
const ropstenDaiTokenAddress = '0xf80a32a835f79d7787e8a8ee5721d0feafd78108';
const ropstenADaiTokenAddress = '0xcB1Fe6F440c49E9290c3eb7f158534c2dC374201';

function Creator() {
  const { address } = useParams();

  const location = useLocation();

  const [web3, setWeb3] = useState(null);
  const [myAddress, setMyAddress] = useState(null);
  const [raidenAddress, setRaidenAddress] = useState(null);
  const [metamaskEthBalance, setMetamaskEthBalance] = useState(0);
  const [metamaskDaiBalance, setMetamaskDaiBalance] = useState(0);
  const [metamaskADaiBalance, setMetamaskADaiBalance] = useState(0);
  const [raidenEthBalance, setRaidenEthBalance] = useState(0);
  const [raidenDaiBalance, setRaidenDaiBalance] = useState(0);
  const [raidenADaiBalance, setRaidenADaiBalance] = useState(0);

  let receivedAddress = false;

  async function getBalance(userAddress, tokenAddress) {
    console.log(
      'user address: ' + userAddress + ' and token address: ' + tokenAddress
    );
    let tokenContract = new window.web3.eth.Contract(ERC20ABI, tokenAddress);
    let balance = 0;
    await tokenContract.methods
      .balanceOf(userAddress)
      .call()
      .then((res) => {
        balance = res;
      })
      .catch((e) => {
        throw Error(`Error getting lendingPool address: ${e.message}`);
      });

    balance = Number(balance / Math.pow(10, 18));
    balance = balance.toPrecision(3);
    return Number(balance);
  }

  useEffect(() => {
    async function getMetamaskAccount() {
      const web3Instance = new Web3(window.ethereum);
      window.ethereum.enable();
      window.web3 = web3Instance;

      setWeb3(web3Instance);
      const mmAddress = (await web3Instance.eth.getAccounts())[0];
      console.log('Metamask Wallet Address: ' + mmAddress);
      setMyAddress(mmAddress);

      // setMetamaskEthBalance(getBalance(address, ropstenEthTokenAddress));
      setMetamaskDaiBalance(
        await getBalance(mmAddress, ropstenDaiTokenAddress)
      );
      setMetamaskADaiBalance(
        await getBalance(mmAddress, ropstenADaiTokenAddress)
      );
    }

    async function getRaidenAccount() {
      // call the raiden api for fetching the address
      let raidenNetworkAddress = null;
      await fetch('http://localhost:5001/api/v1/address')
        .then((res) => res.json())
        .then((data) => {
          raidenNetworkAddress = data.our_address;
          receivedAddress = true;
        })
        .catch((e) => {
          console.log('error in fetching raiden account: ' + e.message);
        });

      console.log('Raiden Wallet Address: ' + raidenNetworkAddress);
      setRaidenAddress(raidenNetworkAddress);

      // setRaidenEthBalance(await getBalance(raidenAddress, ropstenEthTokenAddress));
      setRaidenDaiBalance(
        await getBalance(raidenNetworkAddress, ropstenDaiTokenAddress)
      );
      setRaidenADaiBalance(
        await getBalance(raidenNetworkAddress, ropstenADaiTokenAddress)
      );
    }

    getMetamaskAccount();
    getRaidenAccount();
  }, []);

  const supporterAddress = `${window.location.origin}/supporter/${address}`;
  const creatorAddress = `${window.location.origin}${location.pathname}${address}`;

  const loadingOrRedirect = receivedAddress ? (
    <span>Loading...</span>
  ) : (
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
      <Heading padding="20px" textAlign="center" paddingBottom="5px">
        Support this Creator in the Supporter App
      </Heading>
      <Flex padding="20px" align="flex-end">
        <Input
          value={supporterAddress}
          padding="20px"
          textAlign="center"
          isReadOnly
          placeholder="Welcome"
        />
        <Link to={`/supporter/${address}`}>
          <Button padding="20px" textAlign="center" ml={2}>
            Support
          </Button>
        </Link>
      </Flex>
    </Stack>
  );

  return raidenAddress === address ? (
    <div>
      <CreatorShare link={creatorAddress} />
      <CreatorFunds fundsRaised="752.11" numSupporters="21" />
      {/* <CreatorGiveaways totalRaised="752.11 DAI" numSupporters="21" /> */}
    </div>
  ) : (
    loadingOrRedirect
  );
}

export default Creator;
