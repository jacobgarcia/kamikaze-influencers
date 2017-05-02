import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NetworkRequest from '../NetworkRequest'

class Signin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSignin: props.showSignin || false,
      username: '',
      password: '',
      isLoading: false,
      verifyAccount: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.signinUser = this.signinUser.bind(this)
    this.hideSignin = this.hideSignin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showSignin: nextProps.show
    })
  }

  hideSignin() {
    this.setState({
      showSignin: false
    })
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })

  }

  signinUser() {

    this.setState({ isLoading: true })

    const user = {
      username: this.state.username,
      password: this.state.password
    }

    NetworkRequest.signinUser(user)
    .then(response => {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('notifications', JSON.stringify(response.data.user.notifications))
      location.replace('/')
    })
    .catch((error, other) => {
      const status = error.response.status
      this.setState({ isLoading: false })
      if (status === 418) {
        this.setState({ verifyAccount: true })
      }
      if (status === 403 || status === 401) {
        window.alert('Wrong user or password')
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.signinUser()
  }


  render() {
    return (
      <div className={`hover ${this.state.showSignin ? '' : 'hidden'}`}>
        {this.state.showSignin}
        <div className='signin-body'>
          <form onSubmit={this.handleSubmit}>
          <span className='close' onClick={this.hideSignin}></span>
          <div className='title'>
            { this.state.isLoading ? <div className='loader' id='usernames-loader'></div> : <h3>{this.props.title}</h3> }
          </div>
          <div className='element'>
            <input type='text'
              onChange={this.handleChange}
              id={`username-${this.props.id}`}
              name='username'
              value={this.state.username}
              spellCheck='false'
              className={this.state.username && this.state.username !== '' ? 'dirty' : ''}/>
            <label htmlFor={`username-${this.props.id}`}>Usuario de Instagram</label>
          </div>
          <div className='element'>
            <input type='password'
              onChange={this.handleChange}
              id={`password-${this.props.id}`}
              name='password'
              value={this.state.password}
              className={this.state.password && this.state.password !== '' ? 'dirty' : ''}/>
            <label htmlFor={`password-${this.props.id}`}>Contraseña</label>
          </div>
          {this.state.verifyAccount ?
            <div className='error'>
              <span>You need to verify you account, please signin into <a href='https://www.instagram.com' target='blank'>Instagram</a></span>
            </div>
            :
            undefined
          }
          <input type='submit' value={`${this.state.verifyAccount ? 'Verified, Continue' : 'OK'}`} className='red' onClick={this.signinUser}/>
          </form>
        </div>
      </div>
    )
  }
}

export default Signin
