import React from "react";
import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useToken } from "../../context/LoginContext";

export default function PeopleList({ user }) {
  const [token, setToken] = useToken();

  if (token) {
    return (
      <section className="useritem">
        <li className="person-id" key={user.id}>
          {user.first_name}
          {user.date_of_birth}

          {/* People Edit icon */}
          <Link to={`/people/${user.uid}/edit`}>
            <button>
              <EditIcon />
            </button>
          </Link>
        </li>
      </section>
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
