import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef, useCallback } from 'react';
import { useToken } from '../../context/LoginContext';
// import { DateTime } from 'luxon';
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
  CircularProgressLabel,
  useDisclosure,
} from '@chakra-ui/react';

export default function PeopleDetail() {
  const { uid } = useParams();
  const navigate = useNavigate();
  //const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [isError, setError] = useState('');
  const [token, setToken] = useToken();
  const [isLoading, setLoading] = useState(true);
  const nameRef = useRef(null);
  const dobRef = useRef(null);

  const [name, setName] = useState('');

  function deleteItemDialog() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    return (
      <div>
        <Button colorScheme="red" onClick={onOpen}>
          <AiOutlineDelete />
          <Text ml={1}>Delete</Text>
        </Button>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Person?
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={deleteUser} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    );
  }

  function useHookWithRefCallback(nameRefParam, dobRefParam) {
    const ref = useRef(null);
    const setRef = useCallback((node) => {
      if (ref.current) {
        // Make sure to cleanup any events/references added to the last instance
      }

      if (node) {
        // Check if a node is actually passed. Otherwise node would be null.
        // You can now do what you need to, addEventListeners, measure, etc.
        console.log('param1', nameRefParam);
        console.log('param2', dobRefParam);

        if (token) {
          //sending request
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
            .then((res) => res.json())
            .then((users) => {
              const user = users.data[0];
              if (!user) throw new Error('custom error');
              node.value = user.name;
              //yyyy-MM-dd".

              nameRefParam.current.value = user.name;
              console.log('date', user.name, user.dateOfBirth);

              try {
                const outputDate = formatDateTime(user.dateOfBirth);
                // const test = '2023-04-01T00:00:00.000Z';
                // const parsedDate =
                //   DateTime.fromISO(test).setZone('America/New_York');

                // const outputDate = parsedDate.toFormat('yyyy-MM-dd');
                dobRefParam.current.value = outputDate;
              } catch (error) {}
            })
            .catch((isError) => {
              console.log('isError', isError.message);
            });
        }
      }

      // Save a reference to the node
      ref.current = node;
    }, []);

    return [setRef];
  }

  //sending request
  useEffect(() => {
    if (token) {
      //sending request
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
          console.log(users);

          const user = users.data[0];
          if (!user) throw new Error('custom error');

          setUsers(user);
          console.log('user-data', user);
          setLoading(false);
        })
        .catch((isError) => {
          setLoading(false);
          console.log('isError', isError.message);
          setError('custom text');
        });
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
      .then((res) => res.json())
      .then((users) => {
        //console.log('test -users', users);
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
      `https://api-final-project.onrender.com/api/people/${users._id}`,
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
        console.log(users.data);
        //setUsers(users.data[0]);
        navigate('/people');
      })
      .catch((isError) => {
        setError('custom text');
      });

    //2.if it fail - display error message
  }

  const [ref] = useHookWithRefCallback(nameRef, dobRef);

  if (isLoading) return <CircularProgress isIndeterminate color="green.300" />;

  if (isError) return <div>there is an error</div>;
  return (
    <Container className="container sub-container">
      <div className="people_container">
        <Box className="title">
          <Center>
            <Text className="list-title" as="h3">
              People Detail
              <div ref={ref}></div>
            </Text>
          </Center>
        </Box>

        <ul className="peopleList">
          <FormControl>
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

              <Box>{deleteItemDialog()}</Box>

              <Link href="/people">
                <Button>
                  <AiOutlineClose />
                  <Text ml={1}>Cancel</Text>
                </Button>
              </Link>
            </Flex>
          </Box>
        </ul>
      </div>
    </Container>
  );

  // rest of the component code
}

// <Button colorScheme="red" onClick={deleteUser}>
// <AiOutlineDelete />
// <Text ml={1}>Delete</Text>
// </Button>
