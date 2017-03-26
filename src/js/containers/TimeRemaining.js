import React, { Component } from 'react'

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
        <p>Remaining time</p>
        <Footer></Footer>
      </div>
    )
  }

}

export default TimeRemaining
