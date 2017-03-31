import React, { Component } from 'react'
import { Link } from 'react-router'

import Intro from '../components/Intro'
import NetworkRequest from '../NetworkRequest'
import FameItem from '../Components/FameItem'
import Footer from '../components/Footer'
import PayPalButton from '../components/PayPalButton'

class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hallOfFame: [
        {
          username: 'cesargdm',
          profile_picture: ''
        },
        {
          username: 'thavatta17',
          profile_picture: ''
        }
      ],
      remainingTime: 613123,
      introVisible: false
    }
  }

  render() {
    return (
      <div className=''>
        <Intro visible={this.state.introVisible}/>
        <div className='content-section'>
          <div className='hall-section'>
            <h4>Hall of fame</h4>
            <div className='hall-of-fame'>
              {this.state.hallOfFame.map((user, index) =>
                <FameItem user={user} key={index}/>
              )}
            </div>
          </div>
          <div className='main-section'>
            <div className='section center'>
              <PayPalButton></PayPalButton>
              <p>Remaining time</p>
              <p className='remaining'>{this.state.remainingTime}</p>
              <p><Link>Add time</Link></p>
            </div>
            <div className='section'>
              <h4>Hashtag</h4>
              <input type="text"></input>
            </div>
            <div className='section'>
              <h4>Localization</h4>
              <input type="text"></input>
            </div>
            <div className='section'>
              <h4>Gender</h4>
              <div className='gender-selection'>
                <input type="radio" name="gender" id="both"></input>
                <label htmlFor="both">Both</label>
                <input type="radio" name="gender" id="female"></input>
                <label htmlFor="female">Female</label>
                <input type="radio" name="gender" id="male"></input>
                <label htmlFor="male">Male</label>
              </div>
            </div>
            <div className='section'>
              <h4>Username</h4>
              <input type="text"></input>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    )
  }

}

export default Dashboard
