import React, { Component } from 'react'
import NetworkRequest from '../NetworkRequest'

class Authenticate extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {

    NetworkRequest.getProfile((response) => {
      console.log('response:', response)
    }, (error) => {
      console.log('error:', error)
    })

  }

  render() {
    const { code } = this.props.location.query
    return (
      <div className=''>
        { code }
        {window.localStorage.setItem('token', code)}
      </div>
    )
  }

}

export default Authenticate
