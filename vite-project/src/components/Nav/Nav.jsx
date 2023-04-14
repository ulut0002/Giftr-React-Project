import React from 'react'
import './Nav.css'
import Login from '../Login/Login'
import useSessionStorage from '../../hooks/UseSessionStorage';
import { getToken } from '@chakra-ui/react';
import { useEffect } from 'react';
import {useToken} from '../../context/LoginContext';
export default function Nav() {

  //const [token, setToken] = useSessionStorage();
//console.log(token)
 // setToken(getToken);

 const [token, setToken] = useToken();
console.log(token);
  return (
    
    <div className='mainNav'>
<Login/>

    </div>
  )
}
