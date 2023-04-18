import { useState } from 'react';
import './Nav.css';
import {
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useToken } from '../../context/LoginContext';
export default function Nav() {
  const [token, setToken] = useToken();

  useEffect(() => {}, []);

  function handleLogoutClick() {
    console.log('logout');
    setToken(null);
  }

  function handleLoginClick() {
    console.log('login');

    const redirect = `http://localhost:5173/login/`;
    const renderURL = `https://api-final-project.onrender.com/auth/google?redirect_url=${redirect}`;
    location.href = renderURL;
  }

  return (
    <Container>
      <Flex as="nav" alignItems="center">
        <Heading as="h1">Giftr</Heading>
        <Spacer />
        <HStack>
          {token ? (
            <Button onClick={handleLogoutClick} colorScheme="purple">
              Log out
            </Button>
          ) : (
            <Button onClick={handleLoginClick} colorScheme="purple">
              Login
            </Button>
          )}
        </HStack>
      </Flex>
    </Container>
  );
}

// <nav className="mainNav">
//
// </nav>
