import React from 'react';
import { Link } from '@chakra-ui/react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useRef } from 'react';
import { useToken } from '../../context/LoginContext';

export default function AddPeople() {
  const nameRef = useRef('');
  const dobRef = useRef('');
  const [token, setToken] = useToken();

  function addUser() {
    console.log(nameRef.current.value, dobRef.current.value);

    //sending request to server
    const request = new Request(
      `https://api-final-project.onrender.com/api/people`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          name: nameRef.current.value,
          dateOfBirth: dobRef.current.value,
        }),
      }
    );

    fetch(request)
      .then((res) => res.json())
      .then((users) => {
        console.log(users.data);
        //setUsers(users.data[0]);
      })
      .catch(console.error);
  }
  return (
    <div>
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
