import React from 'react';
import {
  Heading, Stack, Box, useClipboard, Input, Button, Flex,
} from '@chakra-ui/core';

function SupporterLevel({ supportLevel, ...rest }) {
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
      <Heading padding="20px" textAlign="center" paddingBottom="0px">Your Support Level</Heading>
      <Heading padding="20px" textAlign="center" paddingBottom="5px">
        {supportLevel}
        {' '}
        points
      </Heading>
    </Stack>
  );
}

export default SupporterLevel;
