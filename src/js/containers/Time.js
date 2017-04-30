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

const MessageCard = (props) => {

}

const TimeCard = (props) => {
  return (
    <div className={`time-card ${props.item.name ? '' : 'mini'} ${props.item.type === 1 ? 'fame' : 'default'}`}>
      { props.item.name ? <img src='/'></img> : undefined }
      { props.item.name ? <h2>{props.item.name}</h2> : undefined }
      { props.item.name ? <p>{props.item.description}</p> : undefined }
      <span className='days'>{props.item.days} { props.item.days > 1 ? 'days ' : 'day '}</span>
      <div className='price-wrapper'>
        <span className='price'>${props.item.price}</span>
        { props.item.days > 1 ? <span className='per-day'>${Math.round((props.item.price/props.item.days)*100)/100} per day</span> : undefined }
      </div>
      <div className='buy-now'>
        <input type='button'
          onClick={() => props.purchaseTime(props.item._id)}
          className={`${props.item.type === 1 ? 'red' : 'white'}`}
          value={`${props.item.type === 1 ? 'Buy Fame' : 'Buy Time'}`}></input>
      </div>
    </div>
  )
}

class Time extends Component {

  constructor(props) {
    super(props)

    this.state = {
      remainingTime: 0,
      fameItems:[],
      timeItems:[],
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
      showPayment: true,
      links: undefined,
      paymentId: undefined,
      transactions: undefined
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
      console.log(error.response)
      console.log(error)
    })
  }

  tick() {
    if (this.state.remainingTime > 0) {
      this.setState((prevState) => ({
        remainingTime: prevState.remainingTime - 1
      }))
    }
    else {
      this.setState((prevState) => ({
        remainingTime: 0
      }))
    }
  }

  componentWillMount() {
    // Get time packages
    NetworkRequest.getTimeItems()
    .then((response) => {
      this.setState({
        fameItems: response.data.items.filter((item) => item.type === 1),
        timeItems: response.data.items.filter((item) => item.type === 0)
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    })

    const query = this.props.location.query

    // Check if we have a payement in the URL
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
        <div className='hero-dashboard'></div>
        <div className={`hover ${this.state.showPayment ? '' : 'hidden'}`} onClick={this.hidePayment}>
          <div className='payment-details'>
            <h2>Payment Details</h2>
            {
              this.state.transactions ?
                <div>
                  <p className='description-element'><span className='bold'>Number of items: </span>1</p>
                  <p className='description-element'><span className='bold'>Total: </span>{this.state.transactions[0].amount.total}{this.state.transactions[0].amount.currency}</p>
                  <p className='description-element'><span className='bold'>Currency: </span>{this.state.transactions[0].amount.currency}</p>
                  <p className='description-element'><span className='bold'>Description: </span>{this.state.transactions[0].description}</p>
                  <p className='description-element'><span className='bold'>Aplication: </span>Inmediate</p>
                </div>
              :
              <div className='loader relative center'></div>
            }
            {
                this.state.links ? this.state.links.map((link, index) =>
                  link.rel == 'approval_url' ? <TimeLink link={link} key={index}/> : null
                ) : null
            }
          </div>
        </div>
        <div className='section'>
          <div className={`time-card main ${this.state.remainingTime > 0 ? 'working' : 'stoped'}`}>
            <label>Remaining time</label>
            <h1>{days===1 ? `${days} day` : `${days} days`}</h1>
            <h2>{`${hours}:${minutes}:${seconds}`}</h2>
          </div>
          <div className='fame-items'>
            { this.state.fameItems.map((item, index) =>
              <TimeCard item={item} key={index} purchaseTime={this.purchaseTime}/>
            )}
          </div>
          <div className='time-items'>
            <h3>Time packages</h3>
            { this.state.timeItems.map((item, index) =>
              <TimeCard item={item} key={index} purchaseTime={this.purchaseTime}/>
            )}
          </div>

        </div>
        <Footer loggedin={true}></Footer>
      </div>
    )
  }

}

export default Time
