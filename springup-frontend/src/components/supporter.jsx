import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import {
  Heading,
  Stack,
  Box,
  useClipboard,
  Input,
  InputGroup,
  Button,
  Flex,
  InputRightAddon,
} from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import SupporterFunds from './supporterFunds';
// import SupporterGiveaways from './supporterGiveaways';
import SupporterLevel from './supporterLevel';

// ABI Imports
import ERC20ABI from '../abi/ERC20.json';
import LendingPoolAddressProviderABI from '../abi/LendingPoolAddressesProvider.json';
import LendingPoolABI from '../abi/LendingPool.json';
import minABI from '../abi/minABI.json';
import SupporterAccount from './supporterAccount';

const ropstenDaiTokenAddress = "0xf80a32a835f79d7787e8a8ee5721d0feafd78108";
const ropstenADaiTokenAddress = "0xcB1Fe6F440c49E9290c3eb7f158534c2dC374201";

function Supporter() {

  const { creatorAddress } = useParams();

  // web3 instance
  const [web3, setWeb3] = useState(null);

  // address
  const [myAddress, setMyAddress] = useState(null);
  const [raidenAddress, setRaidenAddress] = useState(null);

  // balances
  const [metamaskEthBalance, setMetamaskEthBalance] = useState(0);
  const [metamaskDaiBalance, setMetamaskDaiBalance] = useState(0);
  const [metamaskADaiBalance, setMetamaskADaiBalance] = useState(0);
  const [raidenEthBalance, setRaidenEthBalance] = useState(0);
  const [raidenDaiBalance, setRaidenDaiBalance] = useState(0);
  const [raidenADaiBalance, setRaidenADaiBalance] = useState(0);

  // values
  const [ethValue, setEthValue] = useState(0);
  const [daiValue, setDaiValue] = useState(0);
  const [aDaiValue, setADaiValue] = useState(0);
  const [depositValue, setDepositValue] = useState(0);

  // support amounts
  const amounts = [5, 10, 15];

  async function getBalance(userAddress, token) {

    let tokenAddress = '';
    let balance = 0;
    
    if (token === 'eth') {
      console.log('user address: ' + userAddress);
      await window.web3.eth.getBalance(userAddress)
        .then((result) => {
          balance = +(Web3.utils.fromWei(result, 'ether'));
          balance = Number(balance.toPrecision(3));
          return balance;
        })
        .catch((e) => {
          console.log('error in fetching ethereum balance: ' + e);
        }) 

    } else if (token === 'dai' || token === 'adai') {
      tokenAddress = (token === 'dai') ? ropstenDaiTokenAddress : ropstenADaiTokenAddress;
      console.log('user address: ' + userAddress + ' and token address: ' + tokenAddress);
      let tokenContract = new window.web3.eth.Contract(ERC20ABI, tokenAddress);
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
        
    } else {
      return;
    }
    balance = balance.toPrecision(3);
    return Number(balance);
  }

  useEffect(() => {
    async function getMetamaskAccount() {
      const web3Instance = new Web3(window.ethereum);
      window.ethereum.enable();
      window.web3 = web3Instance;

      setWeb3(web3Instance);
      const address = (await web3Instance.eth.getAccounts())[0];
      console.log('Metamask Wallet Address: ' + address);
      setMyAddress(address);

      let raidenNetworkAddress = null;
      await fetch('http://localhost:5001/api/v1/address')
        .then((res) => res.json())
        .then((data) => {
          raidenNetworkAddress = data['our_address'];
        })
        .catch((e) => {
          console.log('error in fetching raiden account: ' + e.message);
        });

      console.log('Raiden Wallet Address: ' + raidenNetworkAddress);
      setRaidenAddress(raidenNetworkAddress);

      if (address != null && raidenNetworkAddress != null) {
        setMetamaskEthBalance(await getBalance(address, 'eth'));
        setMetamaskDaiBalance(await getBalance(address, 'dai'));
        setMetamaskADaiBalance(await getBalance(address, 'adai'));
        setRaidenEthBalance(await getBalance(raidenNetworkAddress, 'eth'));
        setRaidenDaiBalance(await getBalance(raidenNetworkAddress, 'dai'));
        setRaidenADaiBalance(await getBalance(raidenNetworkAddress, 'adai'));        
      }
      console.log('params: ' + creatorAddress);
    }

    getMetamaskAccount();

  }, []);

  function test() {
    console.log('web3: ' + web3);
    console.log('mm: ' + myAddress);
    console.log('raiden: ' + raidenAddress);
    console.log('metamask eth: ' + metamaskEthBalance);
    console.log('metamask dai: ' + metamaskDaiBalance);
    console.log('raiden eth: ' + raidenEthBalance);
    console.log('raiden dai: ' + raidenDaiBalance);
  }

  // Create the LendingPoolAddressProvider contract instance
  function getLendingPoolAddressProviderContract() {
    const lpAddressProviderAddress =
      '0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728'; // ropsten test net address, for other addresses: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
    const lpAddressProviderContract = new web3.eth.Contract(
      LendingPoolAddressProviderABI,
      lpAddressProviderAddress
    );
    return lpAddressProviderContract;
  }

  // Get the latest LendingPoolCore address
  async function getLendingPoolCoreAddress() {
    const lpCoreAddress = await getLendingPoolAddressProviderContract()
      .methods.getLendingPoolCore()
      .call()
      .catch((e) => {
        throw Error(`Error getting lendingPool address: ${e.message}`);
      });

    console.log('LendingPoolCore address: ', lpCoreAddress);
    return lpCoreAddress;
  }

  // Get the latest LendingPool address
  async function getLendingPoolAddress() {
    const lpAddress = await getLendingPoolAddressProviderContract()
      .methods.getLendingPool()
      .call()
      .catch((e) => {
        throw Error(`Error getting lendingPool address: ${e.message}`);
      });
    console.log('LendingPool address: ', lpAddress);
    return lpAddress;
  }

  /**
   * Deposit DAI into Aave to receive the equivalent aDAI
   * Note: User must have DAI already in their wallet!
   */
  async function depositToAave() {

    const amount = depositValue.toString();
    console.log('confirmed deposit value: ' + amount);
    console.log('address used: ' + raidenAddress);
    const daiAmountinWei = web3.utils.toWei(amount, 'ether').toString();
    const daiAddress = '0xf80a32a835f79d7787e8a8ee5721d0feafd78108'; // ropsten testnet dai
    // const ethAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // ropsten testnet ETH

    const referralCode = '0';

    try {
      const lpCoreAddress = await getLendingPoolCoreAddress();

      // Approve the LendingPoolCore address with the DAI contract
      const daiContract = new web3.eth.Contract(ERC20ABI, daiAddress);
      await daiContract.methods
        .approve(lpCoreAddress, daiAmountinWei)
        .send({ from: myAddress })
        .catch((e) => {
          throw Error(`Error approving DAI allowance: ${e.message}`);
        });

      // Make the deposit transaction via LendingPool contract
      const lpAddress = await getLendingPoolAddress();
      const lpContract = new web3.eth.Contract(LendingPoolABI, lpAddress);
      await lpContract.methods
        .deposit(daiAddress, daiAmountinWei, referralCode)
        .send({ from: myAddress })
        .catch((e) => {
          throw Error(
            `Error depositing to the LendingPool contract: ${e.message}`
          );
        });
    } catch (e) {
      alert(e.message);
      console.log(e.message);
    }
    console.log('deposit completed.');
  }

  async function transferToRaiden(token) {

    // the contract address (use transfer function of this token)
    let tokenContractAddress = '';
    let amount = 0;

    if (token === 'eth') {
      amount = ethValue;
      // tokenContractAddress = ropstenEthTokenAddress;
    } else if (token === 'dai') {
      tokenContractAddress = ropstenDaiTokenAddress;
      amount = daiValue;
    } else if (token === 'adai') {
      tokenContractAddress = ropstenADaiTokenAddress;
      amount = aDaiValue;
    } else {
      return;
    }

    // define address
    if (myAddress == null || raidenAddress == null) {
      return;
    }

    amount = Number(amount * Math.pow(10, 18));
    let txValue = web3.utils.toHex(amount);

    let tokenContract = new window.web3.eth.Contract(ERC20ABI, tokenContractAddress);
    await tokenContract.methods
      .transfer(raidenAddress, txValue)
      .send({from: myAddress})
      .then((res) => {
        console.log('Result of transfer function: ' + res);
      })
      .catch((e) => {
        //throw Error(`Error in transfer funds: ${e.message}`);
        console.log('Transaction failed!' + e.message);
      });
      
  }

  function fundCreator(amount) {
     
    // creating a payment channel
    // from: your (supporter raiden address)
    // to: address in params (0x749388EAB7D316f5A74fbd0a4774970Ce1c37Cf6) (here taken dummy)
    // amount: function param

    let url = 'http://localhost:5001/api/v1/payments/'
    url += ropstenADaiTokenAddress + '/'
    url += '0x749388EAB7D316f5A74fbd0a4774970Ce1c37Cf6';

    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "amount": Number(amount).toString(),
        "identifier": raidenAddress
      })
    })
      .then((result) => {
        console.log('Payment done!');
        console.log(result);
      })
      .catch((e) => {
        console.log('Error in creating payment channel: ' + e);
      })

  }

  function handleEthAmountChange(e) {
    setEthValue(Number(e.target.value));
  }

  function handleDaiAmountChange(e) {
    setDaiValue(Number(e.target.value));
  }

  function handleADaiAmountChange(e) {
    setADaiValue(Number(e.target.value));
  }

  function handleDepositDaiAmountChange(e) {
    setDepositValue(Number(e.target.value));
  }

  return (
    <>
      {myAddress == null ? (
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
          <Heading padding="20px" textAlign="center">
            Connect with Metamask to proceed
          </Heading>
        </Stack>
      ) : (
        <></>
      )}

      {raidenAddress == null ? (
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
          <Heading padding="20px" textAlign="center">
            Unable to fetch raiden account address. Please setup a raiden node
            on your local machine to proceed. Visit{' '}
            <a href="https://docs.raiden.network/" target="_blank">
              Raiden Docs
            </a>{' '}
            for help.
          </Heading>
        </Stack>
      ) : (
        <></>
      )}

      {myAddress != null && raidenAddress != null ? (
        <>
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
            {/** Metamask Address and Tokens */}
            <Heading padding="20px" textAlign="center" paddingBottom="0px">
              Your Metamask Account
            </Heading>
            <Flex padding="20px" align="flex-end">
              {myAddress}
            </Flex>

            {/** ETH Token */}
            <Flex padding="20px" align="flex-end">
              {metamaskEthBalance} ETH
            </Flex>

            {/** DAI Token */}
            <Flex padding="20px" align="flex-end">
              {metamaskDaiBalance} DAI
            </Flex>

            {/** aDAI (Aave Interest Bearing Token) Token */}
            <Flex padding="20px" align="flex-end">
              {metamaskADaiBalance} aDAI
            </Flex>

            {/** Raiden Address and Tokens */}
            <Heading padding="20px" textAlign="center" paddingBottom="0px">
              Your Raiden Account
            </Heading>
            <Flex padding="20px" align="flex-end">
              {raidenAddress}
            </Flex>

            {/** ETH Token */}
            <Flex padding="20px" align="flex-end">
              {raidenEthBalance} ETH
            </Flex>
            <Flex padding="20px" align="flex-end">
              <Button
                textAlign="center"
                marginLeft="100px"
                onClick={async () => await transferToRaiden('eth')}
              >
                Transfer ETH to this account
              </Button>

              <InputGroup>
                  <InputRightAddon children="ETH" />
                  <Input 
                    type="text"
                    roundedLeft="0" 
                    placeholder="ETH Amount"
                    size="md"
                    onChange={handleEthAmountChange}/>
              </InputGroup>

            </Flex>

            {/** DAI Token */}
            <Flex padding="20px" align="flex-end">
              {raidenDaiBalance} DAI
            </Flex>
            <Flex padding="20px" align="flex-end">
              <Button
                textAlign="center"
                marginLeft="100px"
                onClick={async () => await transferToRaiden('dai')}
              >
                Transfer DAI to this account
              </Button>

              <InputGroup>
                    <InputRightAddon children="DAI" />
                    <Input 
                      type="text"
                      roundedLeft="0" 
                      placeholder="DAI Amount"
                      size="md"
                      onChange={handleDaiAmountChange}/>
              </InputGroup>
            </Flex>

            {/** aDAI (Aave Interest Bearing Token) Token */}
            <Flex padding="20px" align="flex-end">
              {raidenADaiBalance} aDAI
            </Flex>
            <Flex padding="20px" align="flex-end">
              <Button
                textAlign="center"
                marginLeft="100px"
                onClick={async () => await transferToRaiden('adai')}
              >
                Transfer aDAI (aave token) to this account
              </Button>
              <InputGroup>
                  <InputRightAddon children="aDAI" />
                  <Input 
                    type="text"
                    roundedLeft="0" 
                    placeholder="aDAI Amount"
                    size="md"
                    onChange={handleADaiAmountChange}/>
              </InputGroup>
            </Flex>

            {/** Generate Aave Tokens */}
            <Flex padding="20px" align="flex-end">
              Deposit your DAI tokens to get interest bearing Aave Tokens and support your favourite creator directly.
            </Flex>
            <Flex padding="20px" align="flex-end">
              <Button
                textAlign="center"
                marginLeft="100px"
                onClick={async () => await depositToAave()}
              >
                Deposit
              </Button>
              <InputGroup>
                  <InputRightAddon children="DAI" />
                  <Input 
                    type="text"
                    roundedLeft="0" 
                    placeholder="DAI Amount"
                    size="md"
                    onChange={handleDepositDaiAmountChange}/>
              </InputGroup>
            </Flex>

          </Stack>

          <SupporterLevel supportLevel="1090" />
          
          {/**Support creators */}
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
            <Heading padding="20px" textAlign="center" paddingBottom="0px">Your Funding Level</Heading>

            <Flex padding="20px" align="flex-end">
              <Button textAlign="center" marginLeft="150px" onClick={async () => await fundCreator(amounts[0])}>
                {' '}
                {amounts[0]}
                {' '}
                aDAI per month
              </Button>
              <Button marginLeft="50px" onClick={async () => await fundCreator(amounts[1])}>
                {' '}
                {amounts[1]}
                {' '}
                aDAI per month
              </Button>
              <Button marginLeft="50px" onClick={async () => await fundCreator(amounts[2])}>
                {' '}
                {amounts[2]}
                {' '}
                aDAI per month
              </Button>
            </Flex>
          </Stack>


        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Supporter;
