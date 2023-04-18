import React from 'react';
import People from '../People/People';
import { Box, Container, Flex, Image, Link, Text } from '@chakra-ui/react';
export default function Home() {
  return (
    <Container className="container">
      <Flex alignItems="center">Welcome to giftr.</Flex>
      <People />
    </Container>
  );
}

{
  /* <Box p={4} display={{ md: 'flex' }}>
<Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
  <Text
    fontWeight="bold"
    textTransform="uppercase"
    fontSize={{ sm: '1rem', md: '4rem' }}
    letterSpacing="wide"
    color="teal.600"
  >
    Marketing
  </Text>

  <Text mt={2} color="gray.500">
    Getting a new business off the ground is a lot of hard work. Here
    are five ideas you can use to find your first customers.
  </Text>
</Box>
</Box>
 */
}
