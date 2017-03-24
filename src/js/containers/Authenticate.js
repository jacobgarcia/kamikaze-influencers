import React, { Component } from 'react'
import { browserHistory } from 'react-router';

class Authenticate extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    browserHistory.push('/')
  }

  render() {
    const { hash } = this.props.location
    const token = hash.split('=')[1]

    window.localStorage.setItem('token', token)

    return (
      <div className=''>
        <h1>Redirigiendo...</h1>
      </div>
    )
  }

}

export default Authenticate
