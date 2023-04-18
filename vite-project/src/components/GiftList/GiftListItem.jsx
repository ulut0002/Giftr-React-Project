import { Link } from 'react-router-dom';
import { AiFillGift } from 'react-icons/ai';
import { EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { AiOutlineSave, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai';
import { useToken } from '../../context/LoginContext';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';

function GiftListItem({ gift, deleteGiftItem }) {
  const { uid } = useParams();
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [deleted, setDeleted] = useState(false);

  function deleteGift() {
    //TODO: Alert and confirm with user

    const url = `${import.meta.env.VITE_BASEURL}/${uid}/gifts/${gift._id}`;
    //console.log('delete url', url);

    const request = new Request(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });

    fetch(request)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`DELETE ERROR ${res}`);
        }
        return res.json();
      })
      .then((users) => {
        // window.location.reload();
        //console.log('param', gift._id);
        deleteGiftItem(gift._id);
      })
      .catch((isError) => {
        console.log('error', isError);
      });
  }

  if (!gift) {
    return null;
  }

  return (
    <div>
      <div>{message}</div>
      <p>
        {gift.name} - {gift.url} - {gift.store}
      </p>
      <div>
        <Link to={`/people/${uid}/gifts/${gift._id}/edit`}>
          <button>
            <EditIcon />
          </button>
        </Link>
        <button onClick={deleteGift}>
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
}
export default GiftListItem;
