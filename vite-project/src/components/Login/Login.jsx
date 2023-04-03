import React from 'react'
import { Link } from 'react-router-dom'
export default function Login() {
  return (
    <div>
      Redirecting to google....
      Go back go homepage after login
      <Link to="/home">Successful log in</Link>
    </div>
    
  )
}
