import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useToken } from '../../context/LoginContext';
import {
  Container,
  UnorderedList,
  Center,
  Box,
  Flex,
  Text,
  ListItem,
} from '@chakra-ui/react';
import PeopleList from './PeopleList';
import { Button } from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
export default function People() {
  const { uid } = useParams();
  const [users, setUsers] = useState([]);
  const [token, setToken] = useToken();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [listError, setListError] = useState('');

  function compareDate(date1, date2) {
    try {
      const dateA = new Date(date1);
      const dateB = new Date(date2);

      const dateA1 = new Date(2023, dateA.getMonth() + 1, dateA.getDate());
      const dateB1 = new Date(2023, dateB.getMonth() + 1, dateB.getDate());
      return dateA1 - dateB1;
    } catch (error) {
      return 0;
    }
  }

  function deletePerson(id) {
    const copy = [...users];
    const idx = copy.findIndex((user) => user._id == id);
    if (idx >= 0) {
      copy.splice(idx, 1);
    }
    setUsers(copy);
  }

  useEffect(() => {
    if (token) {
      const request = new Request(`${import.meta.env.VITE_BASEURL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      fetch(request)
        .then((res) => {
          if (!res.ok) throw new Error('');
          return res.json();
        })
        .then((users) => {
          setLoading(false);
          users.data.sort((userA, userB) => {
            return compareDate(userA.dateOfBirth, userB.dateOfBirth);
          });

          setUsers(users.data);
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

        {listError && (
          <Center>
            <Text className="error-text">{listError}</Text>
          </Center>
        )}

        {users && users.length > 0 && (
          <UnorderedList className="List ">
            {users.length > 0 ? (
              users.map((user) => (
                <PeopleList
                  key={user._id}
                  user={user}
                  deletePerson={deletePerson}
                  setListError={setListError}
                />
              ))
            ) : (
              <ListItem>
                <Text>No detail found</Text>
              </ListItem>
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
    return (
      <Container>
        <Center>
          <Text as="h2" className="empty-list-warning">
            Please login to view list of people
          </Text>
        </Center>
      </Container>
    );
  }
}
