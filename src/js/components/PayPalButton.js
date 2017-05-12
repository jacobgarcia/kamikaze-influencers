import React, { Component } from 'react'

class PayPalButton extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  payment() {
    // To enable the customer to approve the payment, pass the id field to the payment function on your client.
    // ID PAY-519214432G169712VLDOZCKI

    /*
    {
      "href": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-51446607DW679121G",
      "rel": "approval_url",
      "method": "REDIRECT"
    }
    */
    console.log('Payment')
  }

  onAuthorize(data, actions) {
    // When the customer approves the payment, PayPal calls your client-side onAuthorize callback
    console.log('On authorize')

    // TODO: Execute payment, call API to execute payment
  }

  render() {
      return (
        <div className=''>PayPalButton</div>
      )
  }

}

export default PayPalButton
