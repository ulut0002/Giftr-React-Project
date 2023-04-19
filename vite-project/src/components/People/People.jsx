import React from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useToken } from '../../context/LoginContext';
import {
  Container,
  UnorderedList,
  Center,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import PeopleList from './PeopleList';
import { Heading, Button } from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
export default function People() {
  const { uid } = useParams();
  const [users, setUsers] = useState([]);
  const [token, setToken] = useToken();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      //sending request
      const request = new Request(`${import.meta.env.VITE_BASEURL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      fetch(request)
        .then((res) => res.json())
        .then((users) => {
          //console.log(request)
          setLoading(false);

          setUsers(users.data);
          console.log(users);
        })
        .catch((error) => {
          setLoading(false);
          setError(
            error.message
              ? error.message
              : 'An error happened during fetch. Try again later'
          );
        });
    }
  }, []);

  //const user = users.find((u) => u.uid === uid);
  /*  const listItem = users.map((user) => (
    <PeopleList key={user.uid} user={user} />
  )); */

  if (token) {
    if (isLoading) {
      return (
        <Container className="container sub-container">
          <Flex alignItems="center" justifyContent="center">
            <CircularProgress isIndeterminate color="green.300" />
          </Flex>
        </Container>
      );
    }

    return (
      <Container className="container sub-container">
        <Box className="title">
          <Center>
            <Text className="list-title" as="h3">
              People List
            </Text>
          </Center>

          <Center>
            <Link className="add-btn " to={`/people/add`}>
              <Button colorScheme="telegram">Add Person</Button>
            </Link>
          </Center>
        </Box>

        {users && users.length > 0 && (
          <UnorderedList className="List ">
            {users.length > 0 ? (
              users.map((user) => <PeopleList key={user._id} user={user} />)
            ) : (
              <li>No detail found</li>
            )}
          </UnorderedList>
        )}

        {users.length === 0 && (
          <Center>
            <Text className="empty-list-warning">The list is empty.</Text>
          </Center>
        )}
      </Container>
    );
  } else {
    return <div>Please login</div>;
  }
}
