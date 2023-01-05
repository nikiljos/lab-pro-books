import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='NavBar'>
      <div>
        <Link to="/">BookR</Link>
      </div>
      <div>
        <Link to="/signup">Register</Link>
      </div>
    </div>
  );
}

export default NavBar