import React from 'react';
import { EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useToken } from '../../context/LoginContext';
import { AiFillGift } from 'react-icons/ai';
import { DateTime } from 'luxon';

export default function PeopleList({ user }) {
  const [token, setToken] = useToken();

  if (token) {
    const dt = DateTime.fromISO(user.dateOfBirth);

    return (
      <section className="useritem">
        <li className="person-id" key={user._id}>
          {user.name},{dt.toLocaleString()}
          {/* People Edit icon */}
          <Link to={`/people/${user._id}/edit`}>
            <button>
              <EditIcon />
            </button>
          </Link>
          {/* Gift Edit icon */}
          <Link to={`/people/${user._id}/gifts`}>
            <button>
              <AiFillGift />
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
