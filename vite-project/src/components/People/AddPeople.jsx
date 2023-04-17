import { useState } from 'react';
import { Link } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useToken } from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';

export default function AddPeople() {
  const nameRef = useRef('');
  const dobRef = useRef('');
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const [isError, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  function addUser() {
    //sending request to server
    const request = new Request(`${import.meta.env.VITE_BASEURL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: nameRef.current.value,
        dateOfBirth: dobRef.current.value,
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
        navigate('/people');
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message ? error.message : 'Person could not be added');
      });
  }

  return (
    <div>
      {isLoading ? (
        <CircularProgress isIndeterminate color="green.300" />
      ) : null}
      {isError ? <div className="error-text">{isError}</div> : null}
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input type="text" ref={nameRef} />
      </FormControl>
      <FormControl>
        <FormLabel>Date of Birth</FormLabel>
        <Input type="date" ref={dobRef} />
      </FormControl>

      <Button onClick={addUser}>Save</Button>

      <Link href="/people">
        <Button>Cancel</Button>
      </Link>
    </div>
  );
}