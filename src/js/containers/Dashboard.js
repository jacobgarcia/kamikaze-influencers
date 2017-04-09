import React, { Component } from 'react'
import { Link } from 'react-router'

import Intro from '../components/Intro'
import NetworkRequest from '../NetworkRequest'
import FameItem from '../Components/FameItem'
import Footer from '../components/Footer'
import PayPalButton from '../components/PayPalButton'
import Switch from '../components/Switch'
import TimeJS from '../time'
import Tags from '../components/Tags'

class Dashboard extends Component {

  constructor(props) {
    super(props)

    // Get posible notifications
    const notifications = JSON.parse(localStorage.getItem('notifications'))
    const newUser = notifications.includes('0')

    this.state = {
      hallOfFame: [
        { username: 'cesargdm', profile_picture: '' },
        { username: 'thavatta17', profile_picture: '' }
      ],
      remainingTime: 0,
      introVisible: newUser,
      // Set state
      liking: false,
      commenting: false,
      following: false,
      // Targeting
      tags: [],
      locations: [],
      gender: 0,
      usernames: []
    }

    this.onLikingChange = this.onLikingChange.bind(this)
    this.onCommentingChange = this.onCommentingChange.bind(this)
    this.onFollowingChange = this.onFollowingChange.bind(this)
    this.removeNotification = this.removeNotification.bind(this)
    this.tagsChange = this.tagsChange.bind(this)
    this.locationsChange = this.locationsChange.bind(this)
  }

  tick() {
    this.setState((prevState) => ({
      remainingTime: prevState.remainingTime - 1,
    }))
  }

  tagsChange(tags) {
    document.getElementById('tags-loader').classList.remove('hidden')
    NetworkRequest.setTags(tags)
    .then((response) => {
      const user = response.data.user
      // Update local information
      localStorage.setItem('user', JSON.stringify(response.data.user))
      document.getElementById('tags-loader').classList.add('hidden')
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
      document.getElementById('tags-loader').classList.add('hidden')
    })
  }

  usernamesChange(usernames) {
    document.getElementById('usernames-loader').classList.remove('hidden')
    NetworkRequest.setUsernames(usernames)
    .then((response) => {
      const user = response.data.user
      // Update local information
      localStorage.setItem('user', JSON.stringify(response.data.user))
      document.getElementById('usernames-loader').classList.add('hidden')
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
      document.getElementById('usernames-loader').classList.add('hidden')
    })
  }

  locationsChange(localizations) {
    document.getElementById('locations-loader').classList.remove('hidden')
    NetworkRequest.setLocations(localizations)
    .then((response) => {
      const user = response.data.user
      // Update local information
      localStorage.setItem('user', JSON.stringify(response.data.user))
      document.getElementById('locations-loader').classList.add('hidden')
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
      document.getElementById('locations-loader').classList.add('hidden')
    })
  }

  componentWillMount() {

    let user = undefined

    // We don't want a horrible error
    try { user = JSON.parse(localStorage.getItem('user')) }
    catch (error) {
      // TODO: handle error
      console.log(error)
    }

    // Reload user preferences from localStorage
    this.setState({
      tags: user.preferences.tags,
      locations: user.preferences.locations,
      usernames: user.preferences.usernames,
      liking: user.preferences.liking,
      following: user.preferences.following,
      commenting: user.preferences.commenting
    })

    // Conver ISO date to the number of milliseconds since January 1, 1970, 00:00:00
    const remainingTime = Math.floor(user.timeEnd/1000) - Math.floor(Date.now()/1000)

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

    NetworkRequest.updateLiking(!this.state.liking)
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      this.setState({
        liking: response.data.user.preferences.liking
      })
    })
    .catch((error) => {
      // TODO: catch error
      console.log(error)
    })

  }

  onCommentingChange() {

    NetworkRequest.updateCommenting(!this.state.commenting)
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      this.setState({
        commenting: response.data.user.preferences.commenting
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    })

  }

  onFollowingChange() {

    NetworkRequest.updateFollowing(!this.state.following)
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      this.setState({
        following: response.data.user.preferences.following
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    })

  }

  render() {

    let { days, hours, minutes, seconds } = TimeJS.getComponents(this.state.remainingTime)

    return (
      <div className='dashboard'>
        <div className='hero-dashboard'></div>
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
              <div className='time-card main'>
                <label>Remaining time</label>
                <h1>{days===1 ? `${days} day` : `${days} days`}</h1>
                <h2>{`${hours}:${minutes}:${seconds}`}</h2>
                <p><Link to='/time'>Add time</Link></p>
              </div>
            </div>
            <div className='section switching'>
              <div className='switch-section'>
                <span className={`liking ${this.state.liking ? 'active' : '' }`}>Liking</span>
                <Switch id="0" onChange={this.onLikingChange} active={this.state.liking}/>
              </div>
              <div className='switch-section'>
                <span className={`following ${this.state.following ? 'active' : '' }`}>Following</span>
                <Switch id="1" onChange={this.onFollowingChange} active={this.state.following}/>
              </div>
              <div className='switch-section'>
                <span className={`commenting ${this.state.commenting ? 'active' : '' }`}>Commenting</span>
                <Switch id="2" onChange={this.onCommentingChange} active={this.state.commenting}/>
              </div>
              <div className={`commenting-field ${this.state.commenting ? '' : 'hidden' }`}>
                <input type="text" placeholder="Add your comment here"></input>
              </div>
            </div>
            <div className='section'>
              <div className='section-title'>
                <h4>Hashtags</h4>
                <div className='loader small hidden' id='tags-loader'></div>
              </div>
              <Tags onChange={this.tagsChange} tags={this.state.tags}/>
            </div>
            <div className='section'>
              <div className='section-title'>
                <h4>Locations</h4>
                <div className='loader small hidden' id='locations-loader'></div>
              </div>
              <Tags onChange={this.locationsChange} tags={this.state.locations}/>
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
              <div className='section-title'>
                <h4>Usernames</h4>
                <div className='loader small hidden' id='usernames-loader'></div>
              </div>
              <Tags onChange={this.usernamesChange} tags={this.state.usernames}/>
            </div>
          </div>
        </div>
        <Footer loggedin={true}></Footer>
      </div>
    )
  }

}

export default Dashboard
