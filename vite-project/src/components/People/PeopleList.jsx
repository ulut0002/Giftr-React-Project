import React, { useRef, useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

import { useToken } from '../../context/LoginContext';
import { AiFillDelete, AiFillGift, AiOutlineDelete } from 'react-icons/ai';

import { Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { formatDateTime } from '../Util/Util';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { Button, ListItem, Text } from '@chakra-ui/react';
export default function PeopleList({ user, deletePerson, setListError }) {
  const [token, setToken] = useToken();

  function deleteUser() {
    setListError(null);
    const request = new Request(`${import.meta.env.VITE_BASEURL}/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });

    fetch(request)
      .then((res) => {
        if (!res.ok) throw new Error(res.message);
        return res.json();
      })
      .then((users) => {
        deletePerson(user._id);
      })
      .catch((isError) => {
        if (isError && isError.message) {
          setListError(isError.message);
        } else {
          setListError('Sorry. Your request could not be completed.');
        }
      });
  }

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
                <Button
                  colorScheme="red"
                  onClick={() => {
                    onClose();
                    deleteUser();
                  }}
                  ml={3}
                >
                  <AiFillDelete /> <Text ml={1}>Delete</Text>
                </Button>
                ;
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    );
  }

  if (token) {
    return (
      <ListItem className="person-id">
        <Grid
          templateRows="repeat(2, minmax(min-content,max-content))"
          templateColumns="1fr repeat(2,  minmax(min-content,max-content))"
          gap={1}
        >
          <GridItem colStart={1} colEnd={2} rowStart={1} rowEnd={2}>
            <Text className="people-name">{user.name}</Text>
          </GridItem>

          <GridItem colStart={1} colEnd={2} rowStart={2} rowEnd={3}>
            <Text className="people-dob">
              {formatDateTime(user.dateOfBirth)}
            </Text>
          </GridItem>

          <GridItem
            colStart={2}
            colEnd={3}
            rowStart={1}
            rowEnd={3}
            alignSelf="center"
          >
            <Link to={`/people/${user._id}/edit`}>
              <Button colorScheme="blue">
                <EditIcon />
                <Text ml={1}>Edit</Text>
              </Button>
            </Link>
          </GridItem>

          <GridItem
            colStart={3}
            colEnd={4}
            rowStart={1}
            rowEnd={3}
            alignSelf="center"
          >
            <Link to={`/people/${user._id}/gifts`}>
              <Button colorScheme="blue">
                <AiFillGift /> <Text ml={1}>Gift List</Text>
              </Button>
            </Link>
          </GridItem>

          <GridItem
            colStart={4}
            colEnd={5}
            rowStart={1}
            rowEnd={3}
            alignSelf="center"
          >
            {deleteItemDialog()}
          </GridItem>
        </Grid>
      </ListItem>
    );
  } else {
    return <div>Please login</div>;
  }
}
