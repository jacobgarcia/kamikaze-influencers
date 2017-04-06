const express = require('express')
const path = require('path')
const request = require('request')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const PythonShell = require('python-shell')
const router = express.Router()

const User = require(path.resolve('models/User'))

const config = require(path.resolve('config/config'))
const PayPalService = require(path.resolve('routers/v1/PayPalService'))
const InstagramService = require(path.resolve('routers/v1/InstagramService.js'))

mongoose.connect(config.database)

const baseUrl = 'https://api.instagram.com/v1'

router.route('/users/authenticate')
.post((req, res) => {

  const formData = {
    'client_id': config.instagram.client_id,
    'client_secret': config.instagram.client_secret,
    'grant_type': 'authorization_code',
    'redirect_uri': 'http://localhost:8080/authenticate',
    'code': req.body.code
  }

  request.post({url:'https://api.instagram.com/oauth/access_token', formData: formData}, (error, response) => {
    if (error)
      return res.status(500).json({ error })

    let body = undefined

    try { // Set a safe json parse
      body = JSON.parse(response.body)
    } catch (error) { res.status(500).json({ error }) }

    if (body.code === 400)
      res.status(400).json({ error: { message: 'Matching code was not found or was already used.' } })

    const { user, access_token } = body

    if (!user || user == undefined)
      return res.status(500).json({ error: { message: 'Could not get user' } })

    InstagramService.signinUser(user)
    .then((data) => {
      const token = jwt.sign({ un: data.user.username, tn: access_token }, config.jwt_secret)
      // TODO: Handle in FE the new user
      return res.status(data.status).json({ token, message: 'Authenticated!'})
    })
    .catch((error) => {
      return res.status(500).json({ error })
    })

  })

})

/*
   MIDDLEWARE FOR JWT AUTENTICATION
*/

//We may want to protect agains brute force attaks to get our jwt secret
router.use((req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  if (!token)
    return res.status(403).json({error: { message: 'Token not provided' } })
  // We can ensure every request is made by authenticated users in our server.
  jwt.verify(token, config.jwt_secret, (error, decoded) => {
    if (error) //End next requests and send a 401 (unauthorized)}
      return res.status(401).json({error,  message: 'Failed to authenticate token'})
    // TIP: After here in every request we can access the IG username in req._username
    req._username = decoded.un
    req._token = decoded.tn

    next()

  })
})

router.route('/users/self')
.get((req, res) => {
  const username = req._username

  User.findOne({ username: username })
  .exec((error, user) => {
    if (error) return res.status(500).json({ error })
    if (!user) return res.status(404).json({ error: { message: 'User not found' } })
    res.status(200).json({ user })
  })
})

// TODO: save this in PayPalService and return an object
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

  // Get the package ID from DB and get the cost and time, dont't get it from the user
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

    // TODO: send confimration url to client
    return res.status(200).json({ confirmation_url: '' })

  })
  .catch((error) => {
    return res.status(500).json({ error })
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

// TODO: after success buy update user and change the endDate to now+secondsPurchased,
// validate the Date.now + purchased seconds if Date,Now > endDate


/*
   MIDDLEWARE FOR TIME AVAILABLE CHECK

   Here we will check if our user endTime is greater than
   current time, so we weill know if his time has passed
   or not
*/


router.use((req, res, next) => {
  User.find({ username: req._username })
  .exec((error, user) => {
    if (error) return res.status(500).json({ error })

    // Check if the user has remaining time
    if (user.timeEnd < Date.now)
      return res.status(403).json({ error: { message: 'No time available' }})
    next()
  })
})


router.route('/automation/:user/start')
.post((req, res) => {
    //TODO: Update password logic
    const instaBot = new PythonShell('/src/python/bot.py', {pythonOptions: ['-u'], args: [req.body.username, req.body.password]})
    console.log("The bot is ready!")
    instaBot.on('message', (message) => {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message)
    })

    // end the input stream and allow the process to exit
    instaBot.end((err) => {
        if (err){
            throw err;
        }

        console.log('Finished')
    })

    // end the input stream and allow the process to exit
  /*  instaBot.end(function (err) {
      if (err) throw err;
      console.log('finished');
    });*/
   res.status(200).json({'message': 'The automation stub is here!'})
})

module.exports = router
