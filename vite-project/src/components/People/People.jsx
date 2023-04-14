import React from "react";
import { Outlet, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./People.css";
import { useToken } from "../../context/LoginContext";

import PeopleList from "./PeopleList";

export default function People() {
  const { uid } = useParams();
  const [users, setUsers] = useState([]);
  const [token, setToken] = useToken();

  useEffect(() => {
    if (token) {
      fetch("https://random-data-api.com/api/v2/users?size=5")
        .then((res) => res.json())
        .then((users) => {
          setUsers(users);
        })
        .catch(console.error);
    }
  }, []);

  const user = users.find((u) => u.uid === uid);
  const listItem = users.map((user) => (
    <PeopleList key={user.uid} user={user} />
  ));

  if (token) {
    return (
      <div className="people_container">
        <h2>People</h2>

        <ul className="userItemList">
          <h3>User List</h3>
          {users.length > 0 ? (
            users.map((user) => <PeopleList key={user.uid} user={user} />)
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
