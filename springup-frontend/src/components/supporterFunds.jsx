import React from 'react';
import {
  Heading, Stack, Box, useClipboard, Input, Button, Flex,
} from '@chakra-ui/core';

function SupporterFunds({ frequency, amounts, ...rest }) {
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
      <Heading padding="20px" textAlign="center" paddingBottom="0px">Your Funding Level</Heading>

      <Flex padding="20px" align="flex-end">
        <Button textAlign="center" marginLeft="150px">
          {' '}
          {amounts[0]}
          {' '}
          DAI per
          {' '}
          {frequency}
        </Button>
        <Button marginLeft="50px">
          {' '}
          {amounts[1]}
          {' '}
          DAI per
          {' '}
          {frequency}
        </Button>
        <Button marginLeft="50px">
          {' '}
          {amounts[2]}
          {' '}
          DAI per
          {' '}
          {frequency}
        </Button>
      </Flex>
    </Stack>
  );
}

export default SupporterFunds;
