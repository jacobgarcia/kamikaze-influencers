import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NetworkRequest from '../NetworkRequest'
import Localization from '../localization/Localization'

class Signin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSignin: props.showSignin || false,
      username: props.username || '',
      password: '',
      isLoading: false,
      verifyAccount: props.verifyAccount || false,
      usernameDisabled: props.disabled || false,
      isModule: props.isModule || false
    }

    this.handleChange = this.handleChange.bind(this)
    this.signinUser = this.signinUser.bind(this)
    this.hideSignin = this.hideSignin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showSignin: nextProps.show,
      username: nextProps.username,
      usernameDisabled: nextProps.disabled,
      verifyAccount: nextProps.verifyAccount,
      isModule: nextProps.isModule
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
      if (status === 401) {
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
          { !this.state.verifyAccount ?
            <div className='element'>
              <input type='text'
                onChange={this.handleChange}
                id={`username-${this.props.id}`}
                name='username'
                value={this.state.username}
                spellCheck='false'
                className={this.state.username && this.state.username !== '' ? 'dirty' : ''}
                disabled={this.state.usernameDisabled}/>
              <label htmlFor={`username-${this.props.id}`}>{Localization.ig_user}</label>
            </div>
            : <input type='text'
              name='username'
              value={this.state.username}
              hidden/>
          }
          { (!this.state.verifyAccount || this.state.isModule)?
            <div className='element'>
              <input type='password'
                onChange={this.handleChange}
                id={`password-${this.props.id}`}
                name='password'
                value={this.state.password}
                className={this.state.password && this.state.password !== '' ? 'dirty' : ''}/>
              <label htmlFor={`password-${this.props.id}`}>{Localization.ig_password}</label>
            </div>
            : <input type='password'
              name='password'
              value={this.state.password}
              hidden/>
          }
          {this.state.verifyAccount ?
            <div className='error'>
              <span>{Localization.verify_account} <a href='https://www.instagram.com' target='blank'>{Localization.ig}</a> {Localization.verify_account2}</span>
            </div>
            :
            undefined
          }
          <input type='submit' value={`${this.state.verifyAccount ? Localization.continue : Localization.ok}`} className='red' onClick={this.signinUser}/>
          </form>
        </div>
      </div>
    )
  }
}

export default Signin
