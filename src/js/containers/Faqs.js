import React, { Component } from 'react'
import Footer from '../components/Footer'
import Localization from '../localization/Localization'

class Faqs extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className='privacy'>
        <div className='content-section'>
          <h1>{ Localization.faqsTitle }</h1>
          <p></p>
        </div>
        <Footer></Footer>
      </div>
    )
  }

}

export default Faqs
