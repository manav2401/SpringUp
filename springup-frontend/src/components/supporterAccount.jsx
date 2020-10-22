import React from 'react';
import {
  Heading, Stack, Box, useClipboard, Input, Button, Flex,
} from '@chakra-ui/core';

function SupporterAccount ({ metamaskAccountAddress, raidenAccountAddress, ...rest }) {  
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
      <Heading padding="20px" textAlign="center" paddingBottom="0px">Your Metamask Account</Heading>
      <Flex padding="20px" align="flex-end">
        <Heading >
          {metamaskAccountAddress}
        </Heading>
      </Flex>

      <Heading padding="20px" textAlign="center" paddingBottom="0px">Your Raiden Account</Heading>
      <Flex padding="20px" align="flex-end">
        <Heading >
          {raidenAccountAddress}
        </Heading>
      </Flex>

    </Stack>
  );
}

export default SupporterAccount;
