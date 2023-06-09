import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef, useCallback } from 'react';
import { useToken } from '../../context/LoginContext';
import { formatDateTime } from '../Util/Util';

import { AiOutlineSave, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai';
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Box,
  Container,
  Flex,
  Text,
  Button,
  CircularProgress,
  Link,
} from '@chakra-ui/react';

export default function PeopleDetail() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [isError, setError] = useState('');
  const [token, setToken] = useToken();
  const [isLoading, setLoading] = useState(true);
  const nameRef = useRef(null);
  const dobRef = useRef(null);

  function useHookWithRefCallback(nameRefParam, dobRefParam) {
    const ref = useRef(null);
    const setRef = useCallback((node) => {
      if (ref.current) {
      }

      if (node) {
        if (token) {
          const request = new Request(
            `${import.meta.env.VITE_BASEURL}/${uid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              method: 'GET',
            }
          );
          fetch(request)
            .then((res) => {
              if (!res.ok) throw new Error('custom error');
              return res.json();
            })
            .then((users) => {
              const user = users.data[0];
              if (!user) throw new Error('custom error');
              node.value = user.name;
              nameRefParam.current.value = user.name;

              try {
                const outputDate = formatDateTime(user.dateOfBirth);
                dobRefParam.current.value = outputDate;
              } catch (error) {}
            })
            .catch((isError) => {
              console.log('isError', isError.message);
            });
        }
      }

      ref.current = node;
    }, []);

    return [setRef];
  }

  useEffect(() => {
    if (token) {
      const request = new Request(`${import.meta.env.VITE_BASEURL}/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      setLoading(true);

      fetch(request)
        .then((res) => {
          if (!res.ok) throw new Error('no res');
          return res.json();
        })
        .then((users) => {
          const user = users.data[0];
          if (!user) throw new Error('custom error');

          setUsers(user);

          setLoading(false);
        })
        .catch((isError) => {
          setLoading(false);

          setError(import.meta.env.VITE_ERROR);
        });
    } else {
      setLoading(false);
      setError('Sorry. You have to login to view this page');
    }
  }, []);
  function saveUser() {
    const request = new Request(`${import.meta.env.VITE_BASEURL}/${uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: nameRef.current.value,
        dateOfBirth: dobRef.current.value,
      }),
    });
    fetch(request)
      .then((res) => {
        if (!res.ok) throw new error('error');
        return res.json();
      })
      .then((users) => {
        if (!users || !users.data) {
          throw new Error('custom error');
        }
        setLoading(false);
        navigate(`/people`);
      })
      .catch((isError) => {
        setLoading(false);
        setError('custom text');
      });
  }
  function deleteUser() {
    const request = new Request(
      `${import.meta.env.VITE_BASEURL}/${uid}/${users._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }
    );

    fetch(request)
      .then((res) => res.json())
      .then((users) => {
        if (!users.data) throw new Error('throw error not found');

        navigate('/people');
      })
      .catch((isError) => {
        setError('custom text');
      });
  }

  const [ref] = useHookWithRefCallback(nameRef, dobRef);

  if (isLoading)
    return (
      <Container className="container sub-container">
        <Flex justifyContent="center">
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      </Container>
    );

  if (isError)
    return (
      <Container className="container sub-container">
        <Center>
          <Text className="error-text">
            {isError ? isError : 'You cannot view this page without logging in'}
          </Text>
        </Center>
      </Container>
    );
  return (
    <Container className="container sub-container">
      <div className="people_container">
        <Box className="title">
          <Center>
            <Text className="list-title" as="h3">
              {users.name}
              <div ref={ref}></div>
            </Text>
          </Center>
        </Box>

        <FormControl mt={5}>
          <FormLabel>Name</FormLabel>
          <Input type="text" ref={nameRef} />
        </FormControl>
        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <Input type="date" ref={dobRef} />
        </FormControl>

        <Box className="button-group">
          <Flex gap={2}>
            <Button colorScheme="blue" onClick={saveUser}>
              <AiOutlineSave />
              <Text ml={1}>Save</Text>
            </Button>

            <Link href="/people">
              <Button>
                <AiOutlineClose />
                <Text ml={1}>Cancel</Text>
              </Button>
            </Link>
          </Flex>
        </Box>
      </div>
    </Container>
  );
}
