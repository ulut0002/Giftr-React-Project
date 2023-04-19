import React from 'react';
import People from '../People/People';
import {
  Box,
  Container,
  Flex,
  Image,
  Link,
  Text,
  Center,
  Heading,
} from '@chakra-ui/react';
import { useToken } from '../../context/LoginContext';

export default function Home() {
  const [token, setToken] = useToken();
  return (
    <Container className="container">
      {!token && (
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          className="welcome-container"
        >
          <Text as="h1" className="welcome">
            Welcome to Giftr.
          </Text>
          <Text as="h2" className="welcome-subtitle">
            Please login
          </Text>
        </Flex>
      )}

      {token && <People />}
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
