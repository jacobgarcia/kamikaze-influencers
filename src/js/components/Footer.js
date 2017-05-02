import React from 'react'
import { Link } from  'react-router'

const Footer = (props) => {
  return (
    <div className='footer'>
      {props.children}
      <div className='content-section'>
        <div className='links'>
          <ul>
            <li><a href='/about'>About</a></li>
            <li><a href='/contact'>Contact</a></li>
            <li><a href='/usage'>Usage policy</a></li>
            <li><a href='/privacy'>Privacy policy</a></li>
          </ul>
          {props.loggedin ? <a href='/logout'>Log out</a> : ''}
        </div>
        <div className='social-links'>
          <ul>
            <li><Link href="https://www.instagram.com/"><img src="/static/img/icons/instagram.png"></img></Link></li>
            <li><Link href="https://www.facebook.com/"><img src="/static/img/icons/facebook.png"></img></Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
