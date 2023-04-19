import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToken } from '../../context/LoginContext';
import { Link } from 'react-router-dom';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import GiftListItem from './GiftListItem';
import { Heading, Button } from '@chakra-ui/react';
import {
  Container,
  UnorderedList,
  Center,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
export default function GiftList() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [gifts, setGifts] = useState([]);
  const [isError, setError] = useState('');
  const [token, setToken] = useToken();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (token && uid) {
      //sending request
      const request = new Request(
        `${import.meta.env.VITE_BASEURL}${uid}/gifts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      );

      setLoading(true);

      fetch(request)
        .then((res) => {
          if (!res.ok) throw new Error('Fetch failed. Try again. ');
          return res.json();
        })
        .then((gifts) => {
          console.log(gifts);
          if (!gifts || !gifts.data)
            throw new Error('Fetch failed. Try again. ');
          setLoading(false);
          setError('');
          setGifts(gifts.data);
        })
        .catch((error) => {
          setLoading(false);
          setError(
            error.message
              ? error.message
              : 'An error happened during fetch. Try again later'
          );
        });
    } else {
      setLoading(false);
      setError('User id is missing.');
    }
  }, []);

  function deleteGiftItem(id) {
    const copy = [...gifts];
    const idx = copy.findIndex((gift) => gift._id == id);
    if (idx >= 0) {
      copy.splice(idx, 1);
    }
    setGifts(copy);
  }

  if (isLoading) {
    return (
      <Container className="container sub-container">
        <Flex justifyContent="center">
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      </Container>
    );
  }

  if (isError) {
    return <div>{isError ? isError : 'An error happened'}</div>;
  }
  return (
    <Container className="container sub-container">
      <Box className="title">
        <Center>
          <Text className="list-title" as="h3">
            Gift List
          </Text>
        </Center>

        <Center>
          <Link className="add-btn " to={`/people/${uid}/gifts/add`}>
            <Button colorScheme="telegram">Add Gift</Button>
          </Link>
        </Center>
      </Box>

      {gifts && gifts.length > 0 && (
        <UnorderedList className="List ">
          {gifts.length > 0 ? (
            gifts.map((gift) => (
              <GiftListItem
                key={gift._id}
                gift={gift}
                deleteGiftItem={deleteGiftItem}
              />
            ))
          ) : (
            <li>No detail found</li>
          )}
        </UnorderedList>
      )}

      {gifts.length === 0 && (
        <Center>
          <Text className="empty-list-warning">The gift list is empty.</Text>
        </Center>
      )}
    </Container>
  );
}

/* 
<div>
<ul>
  {gifts.map((gift) => (
    <li key={gift._id}>
      <GiftListItem gift={gift} deleteGiftItem={deleteGiftItem} />
    </li>
  ))}
</ul>
</div> */
