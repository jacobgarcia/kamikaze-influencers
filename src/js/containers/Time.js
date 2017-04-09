import React, { Component } from 'react'
import { Link } from 'react-router'
import moment from 'moment'

import NetworkRequest from '../NetworkRequest'
import Footer from '../components/Footer'

const TimeLink = (props) => {
  const { href, rel, method } = props.link
  return (
    <div>
      <a href={href}>Pagar con Paypal...</a>
    </div>
  )
}

class Time extends Component {

  constructor(props) {
    super(props)

    this.state = {
      remainingTime: 0,
      timeFormatted: moment(props.remainingTime).format('hh:mm:ss'),
      links: [],
      showPayment: false,
      paymentId: undefined,
      transactions: undefined
    }

    this.purchaseTime = this.purchaseTime.bind(this)
  }

  purchaseTime() {
    this.setState({
      showPayment: true
    })

    NetworkRequest.setPayment()
    .then((response) => {
      const { links, paymentId, transactions } = response.data

      this.setState({
        links,
        paymentId,
        transactions
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    })
  }

  tick() {
    this.setState((prevState) => ({
      remainingTime: prevState.remainingTime - 1,
    }))
  }

  componentDidMount() {

    let user = undefined

    try {
      user = JSON.parse(localStorage.getItem('user'))
    } catch (error) {
      // TODO: handle error
      console.log(error)
    }

    // Conver ISO date to the number of milliseconds since January 1, 1970, 00:00:00
    const timeEnd = Math.floor(Date.parse(user.timeEnd)/1000)
    const timeNow = Math.floor(Date.now()/1000)
    const remainingTime = timeEnd - timeNow

    // Check if we have time, so we dont't tick negative dates
    if (remainingTime > 0) {
      this.setState({
        remainingTime
      })
      this.interval = setInterval(() => this.tick(), 1000)
    }

  }

  render() {

    // Maybe we can optimize this?
    let remainingTime = Date.now()
    let days = Math.floor((this.state.remainingTime/86400))
    let hours = Math.floor((this.state.remainingTime/3600)%24)
    let minutes = Math.floor((this.state.remainingTime%3600)/60)
    let seconds = Math.floor((this.state.remainingTime%3600)%60)

    return (
      <div className='time'>
        <div className={`hover ${this.state.showPayment ? '' : 'hidden'}`}>
          <div className='payment-details'>
            {
              this.state.transactions ?
                <div>
                  {this.state.transactions[0].amount.total}
                  {this.state.transactions[0].amount.currency}
                </div>
              :
                null
            }
            {
                this.state.links ? this.state.links.map((link, index) =>
                  link.rel == 'approval_url' ? <TimeLink link={link} key={index}/> : null
                ) : null
            }
          </div>
        </div>
        <div className='section'>
          <div className='time-card'>
            <label>Remaining time</label>
            <h1>{days===1 ? `${days} day` : `${days} days`}</h1>
            <h2>{`${hours}:${minutes}:${seconds}`}</h2>
          </div>
          <div className='time-card'>
            <img src='/'></img>
            <h2>Fame</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
            <span className='days'>1 Day</span>
            <span className='price'>$99.99</span>
            <input type='button' onClick={this.purchaseTime} className='red' value='Buy time'></input>
          </div>
        </div>
        <Footer></Footer>
      </div>
    )
  }

}

export default Time
