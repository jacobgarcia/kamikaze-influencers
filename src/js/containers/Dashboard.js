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

    // Get posible notifications
    const notifications = JSON.parse(localStorage.getItem('notifications'))
    const newUser = notifications.includes('0')

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
      remainingTime: 0,
      introVisible: newUser,
      // Set state
      likingActive: false,
      commentingActive: false,
      followingActive: false,
      // Targeting
      tags: [],
      localizations: [],
      gender: 0,
      usernames: []
    }

    this.onLikingChange = this.onLikingChange.bind(this)
    this.onCommentingChange = this.onCommentingChange.bind(this)
    this.onFollowingChange = this.onFollowingChange.bind(this)
    this.removeNotification = this.removeNotification.bind(this)
  }

  tick() {
    this.setState((prevState) => ({
      remainingTime: prevState.remainingTime - 1,
    }))
  }

  componentDidMount() {
    let user = undefined

    try {
      user = JSON.parse(localStorage.getItem('user'))
    } catch (error) {
      // TODO: handle error
      console.log(error)
    }

    // Conver ISO date to the number of milliseconds since January 1, 1970, 00:00:00
    const timeEnd = Math.floor(Date.parse(user.timeEnd)/1000)
    const timeNow = Math.floor(Date.now()/1000)
    const remainingTime = timeEnd - timeNow

    // Check if we have time, so we dont't tick negative dates
    if (remainingTime > 0) {
      this.setState({
        remainingTime
      })
      this.interval = setInterval(() => this.tick(), 1000)
    }
  }

  removeNotification() {
    const notifications = JSON.parse(localStorage.getItem('notifications'))
    notifications.splice(notifications.indexOf('0'), 1)

    localStorage.setItem('notifications', JSON.stringify(notifications))
  }

  onLikingChange() {

    NetworkRequest.updateLiking(this.state.likingActive)
    .then((response) => {
      this.setState({
        likingActive: response.data.liking
      })
    })
    .catch((error) => {
      // TODO: catch error
      console.log(error)
    })

  }

  onCommentingChange() {

    NetworkRequest.updateCommenting(this.state.commentingActive)
    .then((response) => {
      this.setState({
        likingActive: response.data.commenting
      })
    })
    .catch((error) => {
      // TODO: catch error
      console.log(error)
    })
  }

  onFollowingChange() {

    NetworkRequest.updateFollowing(this.state.followingActive)
    .then((response) => {
      this.setState({
        likingActive: response.data.following
      })
    })
    .catch((error) => {
      // TODO: catch error
      console.log(error)
    })

  }

  render() {
    let remainingTime = Date.now()
    let days = Math.floor((this.state.remainingTime/86400))
    let hours = Math.floor((this.state.remainingTime/3600)%24)
    let minutes = Math.floor((this.state.remainingTime%3600)/60)
    let seconds = Math.floor((this.state.remainingTime%3600)%60)

    return (
      <div className=''>
        <Intro visible={this.state.introVisible} onEnd={this.removeNotification}/>
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
                <h1>{days===1 ? `${days} day` : `${days} days`}</h1>
                <h2>{`${hours}:${minutes}:${seconds}`}</h2>
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
              <h4>Hashtags</h4>
              <input type="text"></input>
            </div>
            <div className='section'>
              <h4>Localizations</h4>
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
              <h4>Usernames</h4>
              <input type="text"></input>
            </div>
          </div>
        </div>
        <Footer loggedin={true}></Footer>
      </div>
    )
  }

}

export default Dashboard
