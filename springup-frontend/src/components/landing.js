import { Heading, Stack } from "@chakra-ui/core";
import React from "react";

const Landing = props => {  
    return (
        <Stack borderWidth="1px" shadow="md">
        <Heading>Support creators and get rewarded</Heading>
        <Heading size="md" as="h2">
          Independent creators deal with censorship, high fees, and poor audience
          engagement with the present funding models. With SpringUp, creators and
          supporters don't have these problems. Creators get censorship free, low
          fee funding. Supporters get perks not entirely based on the amount of
          money given.
        </Heading>
      </Stack>
        // <Box bg="#BCEBCB" m={[20, 30,30,30]} textAlign="center" >
        //     This is the Box
        // </Box>
        // <Box bg="green.50" w="75%" p={4} color="white">
        //     This is the Box
        // </Box>

    );
};
export default Landing;