import React, { Component } from 'react'
import { Link } from 'react-router'

class Nav extends Component {

  constructor(props) {
    // Instagram client_id
    super(props)

    this.state = {
      showLogin: true
    }

    this.redirect_uri = `http://localhost:8080/authenticate`
    this.client_id = '4133eeeafdea4e15b6447df3bef09a9c'

    this.showLogin = this.showLogin.bind(this)
    this.hideLogin = this.hideLogin.bind(this)
  }

  showLogin() {
    this.setState({
      showLogin: true
    })
  }

  hideLogin() {
    this.setState({
      showLogin: false
    })
  }

  render() {
    // If we have an authenticated user with user
    const token = window.localStorage.getItem('token')

    if (this.props.user && token) {
      return (
        <nav>
          <div className='profile'>
            <div className='profile-picture'><img src={ this.props.user.profile_picture }></img></div>
            <span>@{this.props.user.username}</span>
          </div>
          <div className='other'><Link to='/'>OWA</Link></div>
          <div className='time'><Link to='/time'>time</Link></div>
        </nav>
      )
    } else {
      return (
        <nav>
          <div className='sign-in-nav'>
              <input type="button" value='Sign in' onClick={this.showLogin}></input>
          </div>
          <div className={`hover ${this.state.showLogin ? '' : 'hidden'}`} onClick={this.hideLogin}>
            <div className='signin-body'>
              <span className='close' onClick={this.hideLogin}>X</span>
              <h3>Sign in</h3>
              <a href={`https://api.instagram.com/oauth/authorize/?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=token`} className='instagram-login'>Sign in with instagram</a>
            </div>
          </div>
        </nav>
      )
    }
  }
}

export default Nav
