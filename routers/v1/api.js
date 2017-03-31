const express = require('express')
// const mongoose = require('mongoose')
const path = require('path')
const router = express.Router()
const request = require('request')

const config = require(path.resolve('config/config.js'))

// const ExpressBrute = require('express-brute')
// const MongoStore = require('express-brute-mongo')
// const MongoClient = require('mongodb').MongoClient
// const ObjectId = require('mongodb').ObjectId

// mongoose.connect(config.database)

const baseUrl = 'https://api.instagram.com/v1'

const PayPalService = require(path.resolve('routers/v1/PayPalService.js'))

router.route('/users/self')
.get((req, res) => {
  const access_token = req.query.access_token

  request(`${baseUrl}/users/self?access_token=${access_token}`, (error, response) => {
    if (error) return res.status(500).json(error)
    //Get data and meta attributes from response.body object
    const { data, meta } = JSON.parse(response.body)
    //Send the meta.code and data from the request
    res.status(meta.code).json(data)
  })
})


const information = {
  "intent":"sale",
  "redirect_urls":{
    "return_url":"http://example.com/your_redirect_url.html",
    "cancel_url":"http://example.com/your_cancel_url.html"
  },
  "payer":{
    "payment_method":"paypal"
  },
  "transactions":[
    {
      "amount":{
        "total":"7.47",
        "currency":"USD"
      }
    }
  ]
}


// TEST:

// PayPalService.getPaypalPaymentToken()
// .then((response) => {
//   return response.body.access_token
// })
// .then((token) => {
//   return PayPalService.getPayment(token, information)
// })
// .then((response) => {
//   console.log('SUCCESFULL RESPONSE, waiting confirmation\n', response)
// })
// .catch((error) => {
//   console.log('Error at Promise', error)
// })

router.route('/payment')
.post((req, res) => {

  const information = {

  }


  getPaypalPaymentToken.then((response) => {
    return response.body.access_token
  })
  .then((access_token) => {
    return getPaymentConfirmation(access_token, information)
  })
  .then((response) => {
    const { confirmation_url } = response.body

    return res.status(200).json({ confirmation_url: '' })

  })
  .catch((error) => {
    console.log(error)
  })


  // request.get('http://some.server.com/').auth(null, null, true, 'bearerToken');

  /*
  var options = {
  url: 'https://api.github.com/repos/request/request',
    headers: {
      'User-Agent': 'request'
    }
  };

  function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.stargazers_count + " Stars");
    console.log(info.forks_count + " Forks");
  }
}

request(options, callback);

  */
})

module.exports = router
