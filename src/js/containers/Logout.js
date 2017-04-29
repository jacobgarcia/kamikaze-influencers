import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class Logout extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentWillMount() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  componentDidMount() {
    setTimeout(location.replace('/'), 2000)
  }

  render() {
    //Remove localstorage credentials

    return (
      <div className=''>Cerrando sesión...</div>
    )
  }

}

export default Logout
