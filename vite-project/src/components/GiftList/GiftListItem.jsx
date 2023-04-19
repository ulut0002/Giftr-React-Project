import { Link } from 'react-router-dom';
import { AiFillGift } from 'react-icons/ai';
import { EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import {
  Button,
  ListItem,
  Flex,
  Text,
  TableContainer,
  Table,
  Thead,
} from '@chakra-ui/react';
import { AiOutlineSave, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai';
import { useToken } from '../../context/LoginContext';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';

function GiftListItem({ gift, deleteGiftItem }) {
  const { uid } = useParams();
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [deleted, setDeleted] = useState(false);

  function deleteGift() {
    //TODO: Alert and confirm with user

    const url = `${import.meta.env.VITE_BASEURL}/${uid}/gifts/${gift._id}`;
    //console.log('delete url', url);

    const request = new Request(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });

    fetch(request)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`DELETE ERROR ${res}`);
        }
        return res.json();
      })
      .then((users) => {
        // window.location.reload();
        //console.log('param', gift._id);
        deleteGiftItem(gift._id);
      })
      .catch((isError) => {
        console.log('error', isError);
      });
  }

  if (!gift) {
    return null;
  }

  return (
    <ListItem className="person-id">
      <Grid
        templateRows="repeat(2, minmax(min-content,max-content))"
        templateColumns="1fr repeat(2,  minmax(min-content,max-content))"
        gap={1}
      >
        <GridItem colStart={1} colEnd={2} rowStart={1} rowEnd={2}>
          <Text className="gift-name">{gift.name}</Text>
        </GridItem>

        <GridItem colStart={1} colEnd={2} rowStart={2} rowEnd={3}>
          <Text className="gift-url">{gift.url}</Text>
        </GridItem>

        <GridItem colStart={1} colEnd={2} rowStart={3} rowEnd={4}>
          <Text className="gift-store">{gift.store}</Text>
        </GridItem>

        <GridItem colStart={2} colEnd={3} rowStart={1} rowEnd={4}>
          <Link to={`/people/${uid}/gifts/${gift._id}/edit`}>
            <Button colorScheme="blue">
              <EditIcon />
            </Button>
          </Link>
        </GridItem>

        <GridItem colStart={3} colEnd={4} rowStart={1} rowEnd={4}>
          <Link to={`/people/${uid}/gifts`}>
            <Button onClick={deleteGift} colorScheme="blue">
              <AiOutlineDelete />
            </Button>
          </Link>
        </GridItem>
      </Grid>
    </ListItem>
  );
}
export default GiftListItem;
