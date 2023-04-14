import { createContext, useContext, useState } from "react";
import useSessionStorage from "../hooks/UseSessionStorage";

const LoginContext = createContext();

function LoginProvider(props) {
  const [token, setToken] = useSessionStorage("giftr-session-storage",null);
  return (
    <LoginContext.Provider
      value={[token, setToken]}
      {...props}
    ></LoginContext.Provider>
  );
}

function useToken() {
  const context = useContext(LoginContext);
  if (!context) throw new Error("Not inside the Provider");
  return context;
}

export { useToken, LoginProvider };
