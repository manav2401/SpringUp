import React from 'react';
import {
  Heading, Stack, Box, useClipboard, Input, Button, Flex,
} from '@chakra-ui/core';

function creatorFunds({ fundsRaised, numSupporters, ...rest }) {
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
      <Heading padding="20px" textAlign="center" paddingBottom="0px">Your Funds</Heading>
      <Heading padding="20px" textAlign="center" paddingBottom="0px">
        {fundsRaised}
        {' '}
        raised
      </Heading>
      <Heading padding="20px" textAlign="center" paddingBottom="0px">
        {numSupporters}
        {' '}
        supporters
      </Heading>

      <Flex padding="20px" align="flex-end">
        <Button textAlign="center" marginLeft="300px">
          Farm
        </Button>
        <Button marginLeft="50px">
          Withdraw
        </Button>
      </Flex>
    </Stack>
  );
}

export default creatorFunds;
