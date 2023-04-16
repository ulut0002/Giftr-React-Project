import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSessionStorage from '../../hooks/UseSessionStorage';
import { useEffect } from 'react';
import {useToken} from '../../context/LoginContext';

export default function Login() {
  const navigate = useNavigate();
const [searchParams,setSearchParams] = useSearchParams();
const [token, setToken] = useToken();
console.log(token);
//const [token, setToken] = useSessionStorage();


  function doLogin() {
    const redirect = `http://localhost:5173/login/`;
    const renderURL = `https://api-final-project.onrender.com/auth/google?redirect_url=${redirect}`;
    location.href = renderURL;
  }

 //initial
  useEffect(() => {
    const getToken = searchParams.get("token");
    if (getToken) {
      setToken(getToken);
      navigate('/people');

    } ;
    if (token) {
      navigate('/people');
    }
  }, []);



  return (
    <div>
       <button onClick={doLogin}>Login</button>
     
    </div>
    
  )
}
