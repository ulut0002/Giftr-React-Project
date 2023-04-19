import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useToken } from '../../context/LoginContext';
import { Button, Center, Container, Text } from '@chakra-ui/react';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useToken();

  function doLogin() {
    const renderURL = `${import.meta.env.VITE_AUTH_URL}=${
      import.meta.env.VITE_REDIRECT_URL
    }`;
    location.href = renderURL;
  }

  useEffect(() => {
    const getToken = searchParams.get('token');
    if (getToken) {
      setToken(getToken);
      navigate('/people');
    }
    if (token) {
      navigate('/people');
    }
  }, []);

  return (
    <Container>
      <Center>
        <Text>You are not logged in.</Text>{' '}
      </Center>

      <Center>
        <Button colorScheme="teal" onClick={doLogin}>
          Click to Login
        </Button>
      </Center>
    </Container>
  );
}
