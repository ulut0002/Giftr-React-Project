import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToken } from '../../context/LoginContext';
import { Link } from 'react-router-dom';
import { AiOutlineSave, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai';
import { useRef } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
export default function GiftDetail() {
  const { uid, giftId } = useParams();
  const [gifts, setGifts] = useState([]);
  const [token, setToken] = useToken();
  const [isError, setError] = useState('');
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const nameRef = useRef('');
  const storeRef = useRef('');
  const urlRef = useRef('');
  useEffect(() => {
    if (token) {
      //sending request
      const request = new Request(
        `${import.meta.env.VITE_BASEURL}/${uid}/gifts/${giftId}`,
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
          //console.log('test -users', users);
          if (!users || !users.data) throw new Error('custom error');
          setGifts(users.data);

          nameRef.current.value = users.data.name;
          storeRef.current.value = users.data.store;
          urlRef.current.value = users.data.url;

          setLoading(false);
          console.log('test -users-continue');
          //setGifts(users.data[0]);
        })
        .catch((isError) => {
          setLoading(false);
          setError('custom text');
        });
    }
  }, []);

  function saveGift() {
    const request = new Request(
      `${import.meta.env.VITE_BASEURL}/${uid}/gifts/${giftId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
          name: nameRef.current.value,
          store: storeRef.current.value,
          url: urlRef.current.value,
        }),
      }
    );
    fetch(request)
      .then((res) => res.json())
      .then((users) => {
        //console.log('test -users', users);
        if (!users || !users.data) throw new Error('custom error');
        setLoading(false);
        navigate(`/people/${uid}/gifts`);
      })
      .catch((isError) => {
        setLoading(false);
        setError('custom text');
      });
  }

  return (
    <div>
      <h1>gift detail</h1>

      <ul className="giftList">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" ref={nameRef} />
        </FormControl>
        <FormControl>
          <FormLabel>Store</FormLabel>
          <Input type="text" ref={storeRef} />
        </FormControl>
        <FormControl>
          <FormLabel>URL</FormLabel>
          <Input type="text" ref={urlRef} />
        </FormControl>

        <button onClick={saveGift}>
          <AiOutlineSave />
        </button>

        <Link to={`/people/${uid}/gifts`}>
          <button>
            <AiOutlineClose />
          </button>
        </Link>
      </ul>
    </div>
  );
}
