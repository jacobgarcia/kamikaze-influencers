import React from 'react'
import { Link } from  'react-router'
import Localization from '../localization/Localization'

const Footer = (props) => {
  return (
    <div className='footer'>
      {props.children}
      <div className='content-section'>
        <div className='contact'>
          <p className='title'>{Localization.clientSupport}</p>
          <p>MEX: +52 (722) 00 00 000</p>
          <p>USA: +52 (722) 00 00 000</p>
        </div>
        <div className='links'>
          <ul>
            <li><a href="mailto:hola@owainfluencers.com">{Localization.contact}</a></li>
            <li><Link to="/terms">{Localization.usage}</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
          </ul>
          {props.loggedin ? <a href='/logout'>{Localization.logout}</a> : ''}
        </div>
        <div className='social-links'>
          <ul>
            <li><a target="_blank" href="https://www.instagram.com/owainfluencersco/"><img src="/static/img/icons/instagram.png"></img></a></li>
            <li><a target="_blank" href="https://www.facebook.com/owainfluencers/"><img src="/static/img/icons/facebook.png"></img></a></li>
            <li><a target="_blank" href="https://www.youtube.com/channel/UCknonV_3l_vJCLuyjKp5Lmg"><img src="/static/img/icons/youtube.png"></img></a></li>
          </ul>
          <span>Copyright © OWA Influencers</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
