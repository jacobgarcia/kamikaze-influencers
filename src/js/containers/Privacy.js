import React, { Component } from 'react'
import Footer from '../components/Footer'

class Privacy extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className='privacy'>
        <div className='content-section'>
          <h1>Privacy notice</h1>
          <p></p>
        </div>
        <Footer></Footer>
      </div>
    )
  }

}

export default Privacy
