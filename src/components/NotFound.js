import React from 'react'
import './NotFound.scss'
import notFoundImg from '../assets/404.png'

const NotFound = () => {
  return (
    <div className='NotFound'>
        <img src={notFoundImg} alt="404" />
        <div>You reached a page which even the developer didn't knew existed 👋</div>
    </div>
  )
}

export default NotFound