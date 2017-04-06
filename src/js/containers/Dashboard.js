import React, { Component } from 'react'
import { Link } from 'react-router'

import Intro from '../components/Intro'
import NetworkRequest from '../NetworkRequest'
import FameItem from '../Components/FameItem'
import Footer from '../components/Footer'
import PayPalButton from '../components/PayPalButton'
import Switch from '../components/Switch'

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
      introVisible: false,
      likingActive: true,
      commentingActive: true,
      followingActive: false
    }

    this.onLikingChange = this.onLikingChange.bind(this)
    this.onCommentingChange = this.onCommentingChange.bind(this)
    this.onFollowingChange = this.onFollowingChange.bind(this)
  }

  onLikingChange() {
    this.setState({
      likingActive: !this.state.likingActive
    })
  }

  onCommentingChange() {
    this.setState({
      commentingActive: !this.state.commentingActive
    })
  }

  onFollowingChange() {
    this.setState({
      followingActive: !this.state.followingActive
    })
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
              <div className='time-card'>
                <label>Remaining time</label>
                <p className='remaining'>{this.state.remainingTime}</p>
                <p><Link to='/time'>Add time</Link></p>
              </div>
            </div>
            <div className='section switching'>
              <div className='switch-section'>
                <span className={`liking ${this.state.likingActive ? 'active' : '' }`}>Liking</span>
                <Switch id="0" onChange={this.onLikingChange} active={this.state.likingActive}/>
              </div>
              <div className='switch-section'>
                <span className={`following ${this.state.followingActive ? 'active' : '' }`}>Following</span>
                <Switch id="1" onChange={this.onFollowingChange} active={this.state.followingActive}/>
              </div>
              <div className='switch-section'>
                <span className={`commenting ${this.state.commentingActive ? 'active' : '' }`}>Commenting</span>
                <Switch id="2" onChange={this.onCommentingChange} active={this.state.commentingActive}/>
              </div>
              <div className={`commenting-field ${this.state.commentingActive ? '' : 'hidden' }`}>
                <input type="text" placeholder="Add your comment here"></input>
              </div>
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
