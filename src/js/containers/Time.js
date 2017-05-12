import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

import NetworkRequest from '../NetworkRequest'
import Footer from '../components/Footer'
import TimeJS from '../time.js'

import Localization from '../localization/Localization'

const TimeLink = (props) => {
  const { href, rel, method } = props.link
  return (
    <div>
      <a href={href}><input type='button' value='Continue' className='red'/></a>
    </div>
  )
}

const PackageDetails = (props) => {
  const transaction = props.transaction
  return (
    <div>
      { props.full ? <p className='description-element'><span className='bold'>Number of items: </span>1</p> : undefined }
      <p className='description-element'><span className='bold'>Total: </span>${transaction.amount.total}</p>
      <p className='description-element'><span className='bold'>Currency: </span>{transaction.amount.currency}</p>
      <p className='description-element'><span className='bold'>Description: </span>{transaction.description}</p>
      { props.full ? <p className='description-element'><span className='bold'>Aplication: </span>Inmediate</p> : undefined }
    </div>
  )
}

const TimeCard = (props) => {
  return (
    <div className={`time-card ${props.item.name ? '' : 'mini'} ${props.item.type === 1 ? 'fame' : 'default'}`}>
      { props.item.description ? <div className='hall-of-fame-image'></div>: undefined }
      { props.item.description ? <h2>{Localization.famous}</h2> : undefined }
      { props.item.description ? <p>{Localization.faster}</p> : undefined }
      <span className='days'>{props.item.days} { props.item.days > 1 ? Localization.day_s : Localization.day}</span>
      <div className='price-wrapper'>
        <span className='price'>${props.item.price}</span>
        { props.item.days > 1 ? <span className='per-day'>${Math.round((props.item.price/props.item.days)*100)/100} {Localization.per_day}</span> : undefined }
      </div>
      <div className='buy-now'>
        <input type='button'
          onClick={() => props.purchaseTime(props.item._id)}
          className={`${props.item.type === 1 ? 'red' : 'white'}`}
          value={`${props.item.type === 1 ? Localization.buy_fame : Localization.buy_time}`}></input>
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
      showConfirm: false,
      showThanks: false,
      paymentId: undefined,
      transactions: undefined
    }

    this.purchaseTime = this.purchaseTime.bind(this)
    this.hidePayment = this.hidePayment.bind(this)
    this.executePayment = this.executePayment.bind(this)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  hidePayment() {
    this.setState({
      showPayment: false
    })
  }

  getPaymentDetails(paymentId) {
    NetworkRequest.getPayment(paymentId)
    .then(response => {
      this.setState({
        transactions: response.data.transactions
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  purchaseTime(time_id) {
    this.setState({
      showPayment: true,
      links: undefined,
      paymentId: undefined,
      transactions: undefined
    })

    // Get the payment details to display in Pay Now

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
      console.log('Confirm')

      this.setState({
        showConfirm: true
      })
      this.getPaymentDetails(payment.paymentId)
    }
  }

  executePayment() {
    console.log('Making payment...')

    const payerId =  this.props.location.query.PayerID
    const paymentId = this.props.location.query.paymentId

    NetworkRequest.setPaymentExecution(paymentId, payerId)
    .then((response) => {

      browserHistory.push('/time')

      //Reload user and time
      this.setState({
        remainingTime: TimeJS.secondsTo(response.data.user.timeEnd),
        showConfirm: false,
        showThanks: true
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

  componentDidMount() {

    let user = undefined

    try { user = JSON.parse(localStorage.getItem('user')) }
    catch (error) {
      // TODO: handle error
      console.log(error)
    }

    const remainingTime = TimeJS.secondsTo(user.timeEnd) // Conver ISO date to the number of milliseconds since January 1, 1970, 00:00:00

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
    const state = this.state

    return (
      <div className='time'>
        <div className='hero-dashboard'></div>
          <div className={`hover  ${state.showThanks ? '' : 'hidden'}`} onClick={() => this.setState({ showThanks: false })}>
            <div className='payment-details'>
              <h2>{Localization.thanksTitle}</h2>
              <p>{Localization.added}</p>
            </div>
          </div>
        <div className={`hover  ${state.showConfirm ? '' : 'hidden'}`}>
          <div className='payment-details'>
            <h2>{Localization.confirmationTitle}</h2>
            { this.state.transactions ? <PackageDetails transaction={this.state.transactions[0]}/> : <div className='loader relative center'></div> }
            <input type='button' className='red' value='Pay now' onClick={this.executePayment}/>
            <img src='/static/img/paypal-button.svg' className='paypal-button' alt='Powered by PayPal'/>
          </div>
        </div>
        <div className={`hover ${state.showPayment ? '' : 'hidden'}`} onClick={this.hidePayment}>
          <div className='payment-details'>
            <h2>{Localization.packageDetailsTitle}</h2>
            { this.state.transactions ? <PackageDetails transaction={this.state.transactions[0]} full/> : <div className='loader relative center'></div> }
            {
                this.state.links ? this.state.links.map((link, index) =>
                  link.rel == 'approval_url' ? <TimeLink link={link} key={index}/> : null
                ) : null
            }
            <img src='/static/img/paypal-button.svg' className='paypal-button' alt='Powered by PayPal'/>
          </div>
        </div>
        <div className='content-section'>
          <div className='section'>
            <div className={`time-card main ${this.state.remainingTime > 0 ? 'working' : 'stoped'}`}>
              <label></label>
              <h1>{days===1 ? `${days} ${Localization.day}` : `${days} ${Localization.days}`}</h1>
              <h2>{`${hours}:${minutes}:${seconds}`}</h2>
            </div>
            <div className='fame-items'>
              { this.state.fameItems.map((item, index) =>
                <TimeCard item={item} key={index} purchaseTime={this.purchaseTime}/>
              )}
            </div>
            <div className='time-items'>
              <h2>{Localization.timepack}</h2>
              { this.state.timeItems.map((item, index) =>
                <TimeCard item={item} key={index} purchaseTime={this.purchaseTime}/>
              )}
            </div>
            <h2>{Localization.special}</h2>
            <div className='aside'>
              <h3>{Localization.special}</h3>
              <p>{Localization.contact_us}</p>
              <a href='mailto:hola@owainfluencers.com'><input type='button' value='Contact us' className='red'/></a>
            </div>
          </div>
        </div>

        <Footer loggedin={true}></Footer>
      </div>
    )
  }

}

export default Time
