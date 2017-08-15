import React, { Component } from 'react'
import { Link } from 'react-router'

import Signin from '../components/Signin'
import Localization from '../localization/Localization'

class Nav extends Component {

  constructor(props) {
    // Instagram client_id
    super(props)

    this.state = {
      showSignin: false,
      username: '',
      password: ''
    }

    this.redirect_uri = `http://localhost:8080/authenticate`
    this.client_id = '4133eeeafdea4e15b6447df3bef09a9c'

  }


  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })

  }

  render() {
    // If we have an authenticated user with user
    const token = window.localStorage.getItem('token')

    if (this.props.user && token) {
      return (
        <nav>
          <div className='nav-content'>
            <div className='profile'>
              <div className='profile-picture'><img src={ this.props.user.profile_picture }></img></div>
              <span>{this.props.user.username}</span>
            </div>
            <div className='logo'><Link to='/'><img src="./static/img/owa.svg"></img></Link></div>
            <div className='time'><Link to='/time'>{Localization.time}</Link></div>
          </div>

        </nav>
      )
    } else {
      return (
        <nav className='signin-nav'>
          <Signin show={this.state.showSignin} id='nav' title={Localization.login}/>
          <div className='nav-content'>
            <div className='logo'><Link to='/'><img src="./static/img/owa.svg"></img></Link></div>
            <input type="button" value={Localization.login} className='signin-button' onClick={() => this.setState({ showSignin: true })}></input>
          </div>
        </nav>
      )
    }
  }
}

export default Nav
