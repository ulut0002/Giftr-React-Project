import { Box, Link } from '@chakra-ui/react';
import {
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Spacer,
} from '@chakra-ui/react';

import { useToken } from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';
export default function Nav() {
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  function handleLogoutClick() {
    setToken(null);
    navigate('/');
  }

  function handleLoginClick() {
    const renderURL = `${import.meta.env.VITE_AUTH_URL}=${
      import.meta.env.VITE_REDIRECT_URL
    }`;
    location.href = renderURL;
  }

  return (
    <Container className="container ">
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

        {token && (
          <Button>
            <Link href={'/'}>Home</Link>
          </Button>
        )}
      </Box>
    </Container>
  );
}
