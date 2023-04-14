/* import React from 'react'
import ReactDOM from 'react-dom/client' */
import App from "./App";
import "./main.css";
import { BrowserRouter } from "react-router-dom";

import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { LoginProvider } from "./context/LoginContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginProvider>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </LoginProvider>
);
