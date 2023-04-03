import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './People.css';
import { EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import EditPeople from './EditPeople';

export default function People() {
  const { uid } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://random-data-api.com/api/v2/users?size=5')
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
      })
      .catch(console.error);
  }, []);

  //const user = users.find((u) => u.uid === uid);



  function editPeople(id) {
    console.log(`edit people with person ${id}`);
    return <Link to={`/people/${id}/edit`} />;
  } 



  const listItem = users.map((person) => (
    <li className="person-id" key={person.id}>
      {person.first_name}
      {person.date_of_birth}


      <button onClick={() => editPeople(person.uid)}>
        <EditIcon />
      </button>
      <button onClick={() => editGift(person.uid)}>
        <PlusSquareIcon />
      </button>
    </li>
  ));

  return (
    <div className="people_container">
      <h2>People</h2>
      <ul className="userItemList">{listItem}</ul>
    </div>
  );
}
