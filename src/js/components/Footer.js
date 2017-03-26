import React from 'react'
import { Link } from  'react-router'

const Footer = (props) => {
  return (
    <div className='footer'>
      <div className='links'>
        <ul>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <a href='/logout'>Log out</a>
      </div>
      <div className='social-links'>
        <ul>
          <li><a href=""><img src="/static/img/icons/instagram.png"></img></a></li>
          <li><a href=""><img src="/static/img/icons/facebook.png"></img></a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
