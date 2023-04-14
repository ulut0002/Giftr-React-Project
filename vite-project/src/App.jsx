import { useState } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import GiftList from "./components/GiftList/GiftList";
import PeopleDetail from "./components/People/PeopleDetail";
import People from "./components/People/People";
import { useParams } from "react-router-dom";
import * as React from "react";
import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
function App() {
  return (
    <div className="App">
      <Header />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/people/*" element={<People />}>
          <Route path=":uid/edit" element={<PeopleDetail />} />
        </Route>
        <Route path="/giftlist" element={<GiftList />} />
      </Routes>
    </div>
  );
}

export default App;
