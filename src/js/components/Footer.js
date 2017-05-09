import React from 'react'
import { Link } from  'react-router'
import Localization from '../localization/Localization'

const Footer = (props) => {
  return (
    <div className='footer'>
      {props.children}
      <div className='content-section'>
        <div className='links'>
          <ul>
            <li><a href='/about'>{Localization.about}</a></li>
            <li><a href='/contact'>{Localization.contact}</a></li>
            <li><a href='/terms'>{Localization.usage}</a></li>
          </ul>
          {props.loggedin ? <a href='/logout'>{Localization.logout}</a> : ''}
        </div>
        <div className='social-links'>
          <ul>
            <li><Link href="https://www.instagram.com/owainfluencersco/"><img src="/static/img/icons/instagram.png"></img></Link></li>
            <li><Link href="https://www.facebook.com/owainfluencers/"><img src="/static/img/icons/facebook.png"></img></Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
