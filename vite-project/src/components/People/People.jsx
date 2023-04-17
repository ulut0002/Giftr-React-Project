import React from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './People.css';
import { useToken } from '../../context/LoginContext';

import PeopleList from './PeopleList';

export default function People() {
  const { uid } = useParams();
  const [users, setUsers] = useState([]);
  const [token, setToken] = useToken();

  useEffect(() => {
    if (token) {
      //sending request
      const request = new Request(`${import.meta.env.VITE_BASEURL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      fetch(request)
        .then((res) => res.json())
        .then((users) => {
          //console.log(request)
          setUsers(users.data);
          console.log(users);
        })
        .catch(console.error);
    }
  }, []);

  //const user = users.find((u) => u.uid === uid);
  /*  const listItem = users.map((user) => (
    <PeopleList key={user.uid} user={user} />
  )); */

  if (token) {
    return (
      <div className="people_container">
        <h2>People</h2>

        <Link to={`/people/add`}>
          <button>Add</button>
        </Link>

        <ul className="userItemList">
          <h3>User List</h3>
          {users.length > 0 ? (
            users.map((user) => <PeopleList key={user._id} user={user} />)
          ) : (
            <li>No detail found</li>
          )}
        </ul>
      </div>
    );
  } else {
    return <div>Please login</div>;
  }
}
