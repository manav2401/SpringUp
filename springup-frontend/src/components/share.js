// function Feature({ title, desc, ...rest }) {
//     return (
//       <Box p={5} shadow="md" borderWidth="1px" {...rest}>
//         <Heading fontSize="xl">{title}</Heading>
//         <Text mt={4}>{desc}</Text>
//       </Box>
//     );
//   }



import React from "react";
import { Heading, Stack, Box, Text } from "@chakra-ui/core";

function Share({ title, desc, ...rest }) {

    return (
        <Stack
        ml={'300px'}
        mr={'300px'}
        mt={'100px'}
        border={30}
        borderRadius={40}
        borderWidth = "20px"
        backgroundColor="whiteAlpha.500"
        opacity={1}
        shadow = "md"
        
      >
        <Heading padding='20px' textAlign='center' paddingBottom='5px'>Share your page</Heading>
        <Text padding='20px' paddingTop='5px' textAlign='center'> 
        springup.eth/e10m2       
        </Text>
        {/* <Heading size="md" padding='20px' as="h2">
        Independent creators deal with censorship, high fees, and poor audience engagement with the present funding models. With SpringUp, creators and supporters don't have these problems. Creators get censorship free, low fee funding. Supporters get perks not entirely based on the amount of money given
        </Heading> */}
        <Box display="flex" border='"#fff"' />
      </Stack>
        // <div>
        //     <p>This is the second page.</p>
        // </div>
    );

}

export default Share;