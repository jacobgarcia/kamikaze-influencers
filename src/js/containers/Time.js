import React, { Component } from 'react'
import { Link } from 'react-router'

import NetworkRequest from '../NetworkRequest'
import Footer from '../components/Footer'
import TimeJS from '../time.js'

const TimeLink = (props) => {
  const { href, rel, method } = props.link
  return (
    <div>
      <a href={href} className='paypal-button'/>
    </div>
  )
}

class Time extends Component {

  constructor(props) {
    super(props)

    this.state = {
      remainingTime: 0,
      items: [],
      links: [],
      showPayment: false,
      paymentId: undefined,
      transactions: undefined
    }

    this.purchaseTime = this.purchaseTime.bind(this)
    this.hidePayment = this.hidePayment.bind(this)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  hidePayment() {
    this.setState({
      showPayment: false
    })
  }

  purchaseTime(time_id) {
    this.setState({
      showPayment: true
    })

    NetworkRequest.setPayment(time_id)
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

  componentWillMount() {
    // Get time packages
    NetworkRequest.getTimeItems()
    .then((response) => {
      this.setState({
        items: response.data.items
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    })

    const query = this.props.location.query

    const payment = {
      payerId: query.PayerID,
      paymentId: query.paymentId,
      token: query.token
    }

    // Check if we have a payment confirmation
    if (payment.payerId && payment.paymentId && payment.token) {
      // Send payment confirmation
      NetworkRequest.setPaymentConfimation(payment)
      .then((response) => {
        //Reload user and time
        this.setState({
          remainingTime: TimeJS.secondsTo(response.data.user.timeEnd)
        })
        clearInterval(this.interval)
        this.interval = setInterval(() => this.tick(), 1000)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      })
      .catch((error) => {
        // TODO: handle error
        console.log(error)
      })
    }

  }

  componentDidMount() {

    let user = undefined

    try { user = JSON.parse(localStorage.getItem('user')) }
    catch (error) {
      // TODO: handle error
      console.log(error)
    }

    // Conver ISO date to the number of milliseconds since January 1, 1970, 00:00:00
    const remainingTime = TimeJS.secondsTo(user.timeEnd)

    // Check if we have time, so we dont't tick negative dates
    if (remainingTime > 0) {
      this.setState({
        remainingTime
      })
      this.interval = setInterval(() => this.tick(), 1000)
    }

  }

  render() {

    let { days, hours, minutes, seconds } = TimeJS.getComponents(this.state.remainingTime)

    return (
      <div className='time'>
        <div className={`hover ${this.state.showPayment ? '' : 'hidden'}`} onClick={this.hidePayment}>
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
          {this.state.items.map((item, index) => {
            return (
              <div className='time-card' key={index}>
                <img src='/'></img>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <span className='days'>{item.days} Day</span>
                <span className='price'>${item.price}</span>
                <div className='buy-now'>
                  <input type='button' onClick={() => this.purchaseTime(item._id)} className='red' value='Buy now'></input>
                </div>
              </div>
            )
          })}

        </div>
        <Footer loggedin={true}></Footer>
      </div>
    )
  }

}

export default Time
