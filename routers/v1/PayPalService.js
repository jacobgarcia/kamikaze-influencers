const path = require('path')
const request = require('request')
const config = require(path.resolve('config/config.js'))

// Change in prod
const paypalUrl = 'https://api.sandbox.paypal.com/v1'

class PayPalService {

  static getPaymentDetails(token, paymentId) {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${paypalUrl}/payments/payment/${paymentId}`,
        method: 'GET',
        json: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      request(options, (error, response) => {
        if (error) return reject({ status: 500, error })
        const { statusCode, statusMessage, body } = response
        resolve({ status: statusCode, body })
      })
    })
  }

  static setPayment(token, information) {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${paypalUrl}/payments/payment`,
        method: 'POST',
        json: true,
        body: Object.assign(information),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      request(options, (error, response) => {

        if (error) {
          console.log(error)
          return reject({ status: 500, error: { error } })
        }

        const { statusCode, statusMessage, body } = response

        switch (statusCode) {
          case 201:
              return resolve({ status: 200, body })
            break;
          case 401:
            return reject({ status: 401, body: body || undefined })
          default:
            return reject({ status: statusCode || 500, error: error || { message: 'Uknown error'} })
        }

      })
    })
  }

  static executePayment(token, paymentId, payer_id) {

    return new Promise((resolve, reject) => {
      const information = {
        payer_id
      }

      const options = {
        url: `${paypalUrl}/payments/payment/${paymentId}/execute`,
        method: 'POST',
        json: true,
        body: Object.assign(information),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      console.log({options})
      request(options, (error, response) => {
        if (error) {
          console.log({error})
          reject({status: 500, error: {error}})
        }

        // console.log(response)
        const { statusCode, statusMessage, body } = response

        console.log(statusCode, statusMessage, body.transactions)

        switch (statusCode) {
          case 200:
            // TODO Send confirmation to user
            return resolve({ status: 200, body })
          case 400:
            return reject({ status: 400, body: { message: 'Payment already done'} })
          default:
            return reject({ status: statusCode || 500, error: error || { message: 'Uknown error'} })
        }
      })
    })
  }

  static getPaymentToken() {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${paypalUrl}/oauth2/token`,
        method: 'POST',
        form: {
          'grant_type': 'client_credentials'
        },
        auth: {
          user: `${config.paypal.client_id}`,
          pass: `${config.paypal.client_secret}`
        },
        headers: {
          'grant_type': 'client_credentials',
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      request(options, (error, response) => {

        if (error)
          return reject({ status: 500, error: { error } })

        const { statusCode, statusMessage, body } = response

        switch (statusCode) {
          case 200:
              // TODO: resolve unsafe JSON Parse
              return resolve({status: 200, body: JSON.parse(body)})
          case 401:
              // TODO: resolve unsafe JSON Parse
            return reject({status: 401, body: JSON.parse(body)})
          default:
            return reject({status: 500, error: undefined})
        }

      })
    })
  }
}

module.exports = PayPalService
