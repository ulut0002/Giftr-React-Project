import { useState } from "react";
import "./Nav.css";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useToken } from "../../context/LoginContext";
export default function Nav() {
  const [token, setToken] = useToken();

  useEffect(() => {}, []);

  function handleLogoutClick() {
    console.log("logout");
    setToken(null);
  }

  function handleLoginClick() {
    console.log("login");

    const redirect = `http://localhost:5173/login/`;
    const renderURL = `https://api-final-project.onrender.com/auth/google?redirect_url=${redirect}`;
    location.href = renderURL;
  }

  return (
    <nav className="mainNav">
      {token ? (
        <Button onClick={handleLogoutClick}>Log out</Button>
      ) : (
        <Button onClick={handleLoginClick}>Login</Button>
      )}
    </nav>
  );
}
