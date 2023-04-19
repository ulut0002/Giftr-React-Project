import { useState } from 'react';
import { Center, Container, Link } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useToken } from '../../context/LoginContext';
import { useNavigate, useParams } from 'react-router-dom';

function NotFound() {
  return (
    <Container className="container sub-container">
      <Center>
        <Text className="error-text">Page not found!</Text>
      </Center>
      <Center>
        <Link href={`/`}>Go Home</Link>
      </Center>
    </Container>
  );
}
export default NotFound;
