import React from 'react';
import { EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useToken } from '../../context/LoginContext';
import { AiFillGift } from 'react-icons/ai';
import { DateTime } from 'luxon';
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
import { Spacer, Box } from '@chakra-ui/react';
export default function PeopleList({ user }) {
  const [token, setToken] = useToken();

  if (token) {
    const dt = DateTime.fromISO(user.dateOfBirth);

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
            <Text className="people-dob">{dt.toLocaleString()}</Text>
          </GridItem>

          <GridItem colStart={2} colEnd={3} rowStart={1} rowEnd={3}>
            {/* People Edit icon */}
            <Link to={`/people/${user._id}/edit`}>
              <Button colorScheme="blue">
                <EditIcon />
              </Button>
            </Link>
          </GridItem>

          <GridItem colStart={3} colEnd={4} rowStart={1} rowEnd={3}>
            {/* Gift Edit icon */}
            <Link to={`/people/${user._id}/gifts`}>
              <Button colorScheme="blue">
                <AiFillGift />
              </Button>
            </Link>
          </GridItem>
        </Grid>
      </ListItem>
    );
  } else {
    return <div>Please login</div>;
  }
}

/* {Gift Edit icon}
<Link to={`/people/${user.uid}/gift`}>
<button onClick={() => 
console.log(`edit gift with id ${user.uid}`)

}>
  <PlusSquareIcon />
</button>
</Link> */
