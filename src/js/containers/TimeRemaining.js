import React, { Component } from 'react'
import { Link } from 'react-router'

import Footer from '../components/Footer'

class TimeRemaining extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className=''>
        <div className='section'>
          <div className='time-card'>
            <label>Remaining time</label>
            <p className='remaining'>{this.state.remainingTime}</p>
            <p><Link to='/time'>Add time</Link></p>
          </div>
        </div>
        <Footer></Footer>
      </div>
    )
  }

}

export default TimeRemaining
