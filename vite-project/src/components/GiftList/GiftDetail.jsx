import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToken } from '../../context/LoginContext';
import { Link } from 'react-router-dom';
import { AiOutlineSave, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai';
import { useRef, useCallback } from 'react';
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
  const nameRef = useRef(null);
  const storeRef = useRef(null);
  const urlRef = useRef(null);

  function useHookWithRefCallback(nameRefParam, urlRefParam, storeRefParam) {
    const ref = useRef(null);
    const setRef = useCallback((node) => {
      if (ref.current) {
        // Make sure to cleanup any events/references added to the last instance
      }

      if (node) {
        // Check if a node is actually passed. Otherwise node would be null.
        // You can now do what you need to, addEventListeners, measure, etc.

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
          fetch(request)
            .then((res) => res.json())
            .then((users) => {
              const user = users.data[0];
              if (!user) throw new Error('custom error');
              node.value = user.name;
              //yyyy-MM-dd".

              nameRefParam.current.value = user.name;
              urlRefParam.current.value = user.url;
              storeRefParam.current.value = user.store;
            })
            .catch((isError) => {
              console.log('isError', isError.message);
            });
        }
      }

      // Save a reference to the node
      ref.current = node;
    }, []);

    return [setRef];
  }

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

  const [ref] = useHookWithRefCallback(nameRef, urlRef, storeRef);

  return (
    <div>
      <h1>gift detail</h1>
      <div ref={ref}></div>

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
