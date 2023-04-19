import { useState } from 'react';
import './Nav.css';
import { Box, Image, Link, Text } from '@chakra-ui/react';
import {
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Spacer,
  Center,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useToken } from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';
export default function Nav() {
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  function handleLogoutClick() {
    setToken(null);
    navigate('/');
  }

  function handleLoginClick() {
    console.log('login');

    const redirect = 'https://reactgiftr.netlify.app/' + `login/`;
    const renderURL = `https://api-final-project.onrender.com/auth/google?redirect_url=${redirect}`;
    location.href = renderURL;
  }

  return (
    <Container className="container">
      <Box p={4} display={{ md: 'flex' }}>
        <Flex as="nav" alignItems="center">
          <Heading as="h1">
            <Link href={'/'}>Giftr</Link>
          </Heading>

          <Spacer />
          <HStack>
            {token ? (
              <Button onClick={handleLogoutClick} colorScheme="teal">
                Log out
              </Button>
            ) : (
              <Button onClick={handleLoginClick} colorScheme="teal">
                Login
              </Button>
            )}
          </HStack>
        </Flex>
      </Box>
    </Container>
  );
}
