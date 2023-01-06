import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'

const NavBar = () => {
  return (
    <div className='NavBar'>
      <div className='logo'>
        <Link to="/">BookR</Link>
      </div>
      <div className='btn'>
        <Link to="/signup">Register</Link>
      </div>
    </div>
  );
}

export default NavBar