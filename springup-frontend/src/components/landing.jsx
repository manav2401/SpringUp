import { Heading, Stack, Text } from "@chakra-ui/core";
import React from "react";

const Landing = (props) => {
  const hasEthereum = window.ethereum;

  return (
    <>
      {!hasEthereum ? (
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
            This app requires an Ethereum client to function
          </Heading>
          <Text padding="20px" paddingTop="5px" textAlign="center">
            Please download an Ethereum client or use Metamask in your browser
            as an extension.
          </Text>
        </Stack>
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
            Fund your creations, reward your audience
          </Heading>
          <Text padding="20px" paddingTop="5px" textAlign="center">
            Independent creators deal with censorship, high fees, and poor
            audience engagement with the present funding models. With SpringUp,
            creators and supporters don't have these problems. Creators get
            censorship free, low fee funding. Supporters get perks based on how
            early they supported, how much they interact, and how much they
            give. Creators early on in their career benefit way more now.
          </Text>
        </Stack>
      )}
    </>
  );
};
export default Landing;
