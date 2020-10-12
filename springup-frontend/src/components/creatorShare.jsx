// function Feature({ title, desc, ...rest }) {
//     return (
//       <Box p={5} shadow="md" borderWidth="1px" {...rest}>
//         <Heading fontSize="xl">{title}</Heading>
//         <Text mt={4}>{desc}</Text>
//       </Box>
//     );
//   }

import React from 'react';
import {
  Heading, Stack, Box, useClipboard, Input, Button, Flex,
} from '@chakra-ui/core';

function CreatorShare({ link, ...rest }) {
  const [value, setValue] = React.useState(link);
  const { onCopy, hasCopied } = useClipboard(value);

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
      <Heading padding="20px" textAlign="center" paddingBottom="5px">Share your page</Heading>
      <Flex padding="20px" align="flex-end">
        <Input value={value} padding="20px" textAlign="center" isReadOnly placeholder="Welcome" />
        <Button onClick={onCopy} padding="20px" textAlign="center" ml={2}>
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </Flex>
    </Stack>
  );
}

export default CreatorShare;
