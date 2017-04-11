import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class Logout extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    location.replace('/')
  }

  render() {
    //Remove localstorage credentials

    return (
      <div className=''>Cerrando sesión...</div>
    )
  }

}

export default Logout
