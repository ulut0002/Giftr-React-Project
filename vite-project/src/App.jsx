import { useState } from 'react'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import GiftList from './components/GiftList/GiftList'
import People from './components/People/People'
import { useParams } from 'react-router-dom';
import * as React from 'react';
import Login from './components/Login/Login'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import EditPeople from './components/People/EditPeople'

function App() {
  const [count, setCount] = useState(0)
  const { uid } = useParams();
  return (   

    <div className="App">  
    <Header/>

 <Routes>
  {/* Home page */}
  <Route path="/login" element={ <Login/>}/>
  <Route path="/" element={ <Home/>}/>
  <Route path="home" element={ <Home/>}/>
  <Route path="index" element={ <Home/>}/>
  <Route path="/index.html" element={ <Home/>}/>
 

  <Route path="/people/*" element={ <People/>}>
  <Route path=":uid/edit" element={ <EditPeople/>}/>
 
</Route>
  <Route path="/giftlist" element={ <GiftList/>}/>

 </Routes>
    </div>

  )

}

export default App
