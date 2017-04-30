import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import NetworkRequest from '../NetworkRequest'

class Authenticate extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    // Get token
    const query = this.props.location.query
    const code = query.code
    // TODO: check if user authrized or not

    NetworkRequest.getToken(code, (response) => {
      localStorage.setItem('token', response.data.token)
      // Set notifications in localStorage
      localStorage.setItem('notifications', JSON.stringify(response.data.notifications))
      location.replace('/')
    }, (error) => {
      // TODO: display error message and return landing
      console.log(error)
      //location.replace('/')
    })

  }

  render() {
    return (
      <div className=''>
        <h1>Autenticando...</h1>
      </div>
    )
  }

}

export default Authenticate
