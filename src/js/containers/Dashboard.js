import React, { Component } from 'react'
import NetworkRequest from '../NetworkRequest'

class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    NetworkRequest.getProfile((res, err) => {
      if (err) console.log(err)
      console.log(res)
    })
  }

  render() {
    return (
      <div className=''>
        Logged in
        { window.localStorage.getItem('token') }
      </div>
    )
  }

}

export default Dashboard
