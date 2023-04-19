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
