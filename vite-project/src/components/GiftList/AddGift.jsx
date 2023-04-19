import { useState } from 'react';
import { Box, Container, Flex, Link } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useToken } from '../../context/LoginContext';
import { useNavigate, useParams } from 'react-router-dom';

function AddGift() {
  const nameRef = useRef('');
  const urlRef = useRef('');
  const storeRef = useRef('');
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const [isError, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { uid } = useParams();

  function addGift() {
    const request = new Request(`${import.meta.env.VITE_BASEURL}${uid}/gifts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: nameRef.current.value,
        url: urlRef.current.value,
        store: storeRef.current.value,
      }),
    });
    setLoading(true);
    fetch(request)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.message);
        }
        return res.json();
      })
      .then((user) => {
        if (!user || !user.data) {
          throw new Error('');
        }
        setLoading(false);
        navigate(`/people/${uid}/gifts`);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message ? error.message : 'Gift could not be added');
      });
  }

  return (
    <Container className="container  sub-container">
      {isLoading && <CircularProgress isIndeterminate color="green.300" />}

      <Text as="h3" className="new-entry-header">
        Add a new gift
      </Text>

      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input type="text" ref={nameRef} />
      </FormControl>

      <FormControl>
        <FormLabel>Store</FormLabel>
        <Input type="text" ref={storeRef} />
      </FormControl>

      <FormControl>
        <FormLabel>URL</FormLabel>
        <Input type="url" ref={urlRef} />
      </FormControl>

      <Box className="button-group">
        <Flex gap={2}>
          <Button onClick={addGift} colorScheme="telegram">
            Save
          </Button>

          <Link href={`/people/${uid}/gifts`}>
            <Button colorScheme="gray">
              <Text>Cancel</Text>
            </Button>
          </Link>
        </Flex>
      </Box>
      {isError && <div className="error-text">{isError}</div>}
    </Container>
  );
}
export default AddGift;
