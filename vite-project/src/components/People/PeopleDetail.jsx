import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useToken } from '../../context/LoginContext';

import { Link } from 'react-router-dom';
import { AiOutlineSave, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  CircularProgressLabel,
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
        .then((res) => res.json())
        .then((users) => {
          console.log(users);

          const user = users.data[0];
          if (!user) throw new Error('custom error');
          setUsers(user.data);

          if (nameRef.current) {
            nameRef.current.value = user.name;
            setName(user.name);
          }

          setLoading(false);
        })
        .catch((isError) => {
          setLoading(false);
          console.log('isError', isError.message);
          setError('custom text');
        });
    }
  }, [nameRef, nameRef.current, name]);
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
        if (!users || !users.data) throw new Error('custom error');
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

  if (isLoading) return <CircularProgress isIndeterminate color="green.300" />;

  if (isError) return <div>there is an error</div>;
  return (
    <div className="people_container">
      <h1>people detail</h1>

      <ul className="peopleList">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" ref={nameRef} />
        </FormControl>
        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <Input type="date" ref={dobRef} />
        </FormControl>

        <button onClick={saveUser}>
          <AiOutlineSave />
        </button>
        <button onClick={deleteUser}>
          <AiOutlineDelete />
        </button>
        <Link to={`/people`}>
          <button>
            <AiOutlineClose />
          </button>
        </Link>
      </ul>
    </div>
  );

  // rest of the component code
}
