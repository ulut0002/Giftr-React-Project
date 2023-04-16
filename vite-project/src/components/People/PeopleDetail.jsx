import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { useToken } from '../../context/LoginContext';

import { Link } from 'react-router-dom';
import { AiOutlineSave, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai';

export default function PeopleDetail() {
  const { uid } = useParams();
  const navigate = useNavigate();
  //const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isError, setError] = useState('');
  const [token, setToken] = useToken();
  const [isLoading, setLoading] = useState(true);
  //sending request
  useEffect(() => {
    if (token) {
      //sending request
      const request = new Request(
        `https://api-final-project.onrender.com/api/people/${uid}`,
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
        .then((res) => res.json())
        .then((users) => {
          if (!users || !users.data || !users.data[0])
            throw new Error('custom error');
          setLoading(false);
          setUsers(users.data[0]);
        })
        .catch((isError) => {
          setLoading(false);
          setError('custom text');
        });
    }
  }, []);
  function saveUser() {
    //1.do post fetch

    //2.if it fail - display error message
    console.log('save!');
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
  console.log('iserror', isError);

  if (isLoading) return <CircularProgress isIndeterminate color="green.300" />;

  if (isError) return <div>there is an error</div>;
  return (
    <div className="people_container">
      <h1>people detail</h1>

      <ul className="peopleList">
        {users.name}
        {users.dateOfBirth}

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
