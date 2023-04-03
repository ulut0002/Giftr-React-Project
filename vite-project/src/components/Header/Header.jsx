import React from 'react'
import header from './Header.css'
import { Link } from 'react-router-dom';
export default function Header() {

  
     
  return (
    <div className='header'>
<Link to="/login">Log In</Link>

    </div>
  )
}
