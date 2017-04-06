const path = require('path')
const request = require('request')
const config = require(path.resolve('config/config.js'))
const paypalUrl = 'https://api.sandbox.paypal.com/v1'

class PayPalService {
  constructor() {
  }

  static getPayment(token, information) {
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

        if (error)
          return reject({ status: 500, error: { error } })

        const { statusCode, statusMessage, body } = response

        switch (statusCode) {
          case 201:
              return resolve({ status: 200, body })
            break;
          case 401:
            return reject({ status: 401, body: body })
          default:
            return reject({ status: statusCode || 500, error: { message: 'Uknown error'} })
        }

      })
    })
  }

  static getPaypalPaymentToken() {
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
              return resolve({status: 200, body: JSON.parse(body)})
            break;
          case 401:
            return reject({status: 401, body: JSON.parse(body)})
          default:
            return reject({status: 500, error: undefined})
        }

      })
    })
  }
}

module.exports = PayPalService