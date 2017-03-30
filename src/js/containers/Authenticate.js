import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class Authenticate extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    // Get token
    const { hash } = this.props.location
    const token = hash.split('=')[1]

    // Set to localStorage
    window.localStorage.setItem('token', token)

    // TODO: Get user and save to API
    // TODO: Get our API's token
    // TODO: return success authentication with our API

    // Redirect to root
    location.replace('/')
  }

  render() {
    return (
      <div className=''>
        <h1>Redirigiendo...</h1>
      </div>
    )
  }

}

export default Authenticate
