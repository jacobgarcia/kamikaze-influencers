import React from 'react'
import { Link } from  'react-router'

const Footer = (props) => {
  return (
    <div className='footer'>
      {props.children}
      <div className='content-section'>
        <div className='links'>
          <ul>
            <li>About</li>
            <li>Contact</li>
          </ul>
          {props.loggedin ? <a href='/logout'>Log out</a> : ''}
        </div>
        <div className='social-links'>
          <ul>
            <li><a href="https://www.instagram.com/"><img src="/static/img/icons/instagram.png"></img></a></li>
            <li><a href="https://www.facebook.com/"><img src="/static/img/icons/facebook.png"></img></a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
