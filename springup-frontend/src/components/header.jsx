import React from 'react';
import {
  Box, Heading, Flex, Button, Image,
} from '@chakra-ui/core';
import {
  Link,
} from 'react-router-dom';

const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

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
      <Flex align="center" mr={5}>
        <Image
          rounded="full"
          size="50px"
          src="https://i.imgur.com/zyQ9L3t.png"
          alt="SpringUp logo"
        />
        <Heading as="h1" size="lg" ml="5px" letterSpacing="-.1rem">
          SpringUp
        </Heading>
      </Flex>

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

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <Link to="/creator">
          <Button bg="transparent" border="1px">
            Launch App ↗
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
