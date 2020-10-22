import React, { useEffect, useState } from 'react';
import { Box, Heading, Flex, Button, Image } from '@chakra-ui/core';
import { Link, useLocation } from 'react-router-dom';
import logo from '../logo512.png';

const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const location = useLocation();
  const hasEthereum = window.ethereum;

  const [raidenAddress, setRaidenAddress] = useState(null);

  useEffect(() => {
    async function getRaidenAccount() {
      // call the raiden api for fetching the address
      let raidenNetworkAddress = null;
      await fetch('http://localhost:5001/api/v1/address')
        .then((res) => res.json())
        .then((data) => {
          raidenNetworkAddress = data.our_address;
        })
        .catch((e) => {
          console.log('error in fetching raiden account: ' + e.message);
        });

      console.log('Raiden Wallet Address: ' + raidenNetworkAddress);
      setRaidenAddress(raidenNetworkAddress);
    }

    getRaidenAccount();
  }, []);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#BCEBCB"
      color="black"
      {...props}
    >
      <Link to="/">
        <Flex align="center" mr={5}>
          <Image
            rounded="full"
            size="50px"
            src={logo}
            // src="https://i.imgur.com/zyQ9L3t.png"
            alt="SpringUp logo"
          />
          <Heading as="h1" size="lg" ml="5px" letterSpacing="-.1rem">
            SpringUp
          </Heading>
        </Flex>
      </Link>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        {/* <MenuItems>Docs</MenuItems>
        <MenuItems>Examples</MenuItems>
        <MenuItems>Blog</MenuItems> */}
      </Box>
      {location.pathname === '/' && (
        <Flex>
          <Box
            display={{ base: show ? 'block' : 'none', md: 'block' }}
            mt={{ base: 4, md: 0 }}
            mr={5}
          >
            <Link to="/supporter">
              <Button bg="transparent" border="1px" isDisabled={!hasEthereum}>
                Launch Supporter App ↗
              </Button>
            </Link>
          </Box>
          <Box
            display={{ base: show ? 'block' : 'none', md: 'block' }}
            mt={{ base: 4, md: 0 }}
          >
            <Link to={`/creator/${raidenAddress}`}>
              <Button bg="transparent" border="1px" isDisabled={!hasEthereum}>
                Launch Creator App ↗
              </Button>
            </Link>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
