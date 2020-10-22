import React from 'react';
import {
  Heading,
  Stack,
  Box,
  useClipboard,
  Input,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/core';

function CreatorGiveaways({ totalRaised, numSupporters, ...rest }) {
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
      <Heading padding="20px" textAlign="center" paddingBottom="0px">
        Your Support Levels
      </Heading>

      <FormControl padding="20px" textAlign="center">
        <FormLabel htmlFor="email">Premium Video #5</FormLabel>
        <Input
          value="https://mega.nz/file/8B0U0ZpR#UNpDB3VVqnFarxqQicWyGQIhLFQWgp_AbzvoOYxyAhQ"
          isReadOnly
        />
        <FormHelperText>Secret: *******</FormHelperText>
        <Button> Update </Button>
        <Button marginLeft="50px"> Delete </Button>
      </FormControl>
      <FormControl padding="20px" textAlign="center">
        <FormLabel htmlFor="email">Alpha Game Release</FormLabel>
        <Input
          value="https://bit.ly/sdh1238hsadf2ASDFh142h123ASDF"
          isReadOnly
        />
        <FormHelperText>Secret: *******</FormHelperText>
        <Button> Update </Button>
        <Button marginLeft="50px"> Delete </Button>
      </FormControl>
      <Flex padding="20px" justifyContent="center">
        <Button> Add New </Button>
      </Flex>
    </Stack>
  );
}

export default CreatorGiveaways;
