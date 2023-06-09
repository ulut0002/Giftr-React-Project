import { useState } from 'react';
import Home from './components/Home/Home';
import GiftList from './components/GiftList/GiftList';
import PeopleDetail from './components/People/PeopleDetail';
import People from './components/People/People';
import AddPeople from './components/People/AddPeople';
import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import AddGift from './components/GiftList/AddGift';
import GiftDetail from './components/GiftList/GiftDetail';
import NotFound from './components/NotFound/NotFound';
function App() {
  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/people" element={<People />} />
        <Route path="/people/add" element={<AddPeople />} />
        <Route path="/people/:uid/edit" element={<PeopleDetail />} />
        <Route path="/people/:uid/gifts" element={<GiftList />} />
        <Route path="/people/:uid/gifts/add" element={<AddGift />} />
        <Route
          path="/people/:uid/gifts/:giftId/edit"
          element={<GiftDetail />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
