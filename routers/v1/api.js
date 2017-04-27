const express = require('express')
const path = require('path')
const request = require('request')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const PythonShell = require('python-shell')
const winston = require('winston')
const router = express.Router()

const User = require(path.resolve('models/User'))
const Item = require(path.resolve('models/Item'))
const Payment = require(path.resolve('models/Payment'))
const Token = require(path.resolve('models/Token'))

const config = require(path.resolve('config/config'))
const PayPalService = require(path.resolve('routers/v1/PayPalService'))

mongoose.connect(config.database)

const baseUrl = 'https://api.instagram.com/v1'

/* LOGIN INTO OWA AND VALIDATE IF THE USER IS VALID ON IG */
// TODO: Protect vs brute force attack
router.route('/users/authenticate')
.post((req, res) => {

  const { username, password } = req.body.user
  const instaLogin = new PythonShell('lib/python/login.py', { pythonOptions: ['-u'], args: [ username, password ] })

  /* Wait for the response in the login */
  instaLogin.on('message', (message) => {
    // end the input stream and allow the process to exit
    instaLogin.end((error) => {
      if (error) {
        winston.log(error)
        return res.status(500).json({ error })
      }

      const user = JSON.parse(message)

      if (user.status === 'error') {
        return res.status(403).json({ error: {'message': 'Invalid Instagram username and password.'}})
      }

      if (user.status === 'error_connection') {
        winston.log('Connection attempt to Instagram failed.')
        return res.status(500).json({ error: {'message': 'Connection attempt to Instagram has failed.'}})
      }

      if (user.status === 'success') {
        /* Save the user in the DB */
        //TODO: Encrypt password using an SHA1 algorithm
        User.findOne({ username }, { password: 0 })
        .exec((error, foundUser) => {
          if (error) {
            winston.log(error)
            return res.status(500).json({ error })
          }
          if (!foundUser) {
            new User({
              username: username.toLowerCase(),
              password,
              fullName: user.fullName,
              website: user.website,
              profile_picture: user.profile_picture,
              instagram: {
                id: user.id,
                bio: user.bio
              }
            })
            .save((error, newUser) => {
              if (error) {
                winston.log(error)
                return res.status(500).json({ error })
              }

              // Create and send token
              const token = jwt.sign({ username: newUser.username }, config.jwt_secret)
              newUser.notifications = ['0']

              res.status(201).json({ 'message': 'New user on board. Welcome aboard!', token, user: newUser })

            })
          } else { // Else is important, otherwise iw will run before saving user
            // Create and send token
            const token = jwt.sign({ username: foundUser.username }, config.jwt_secret)
            res.status(200).json({'message': 'User already registered. Welcome again!', token, user: foundUser })
          }
        })
      } else {
        winston.log('Unknown error ocurred on login route', user)
        res.status(500).json({ error: { message: 'Unknown error ocurred.' }})
      }

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
    req._username = decoded.username

    next()

  })
})

router.route('/items')
.get((req, res) => {
  Item.find()
  .exec((error, items) => {
    if (error) return res.status(500).json({ error })
    res.status(200).json({ items })
  })
})

router.route('/users/self')
.get((req, res) => {
  const username = req._username
  console.log('Finding ', username)
  User.findOne({ username })
  .exec((error, user) => {
    if (error) return res.status(500).json({ error })
    if (!user) return res.status(404).json({ error: { message: 'User not found' } })
    res.status(200).json({ user })
  })
})

router.route('/users/self/following')
.put((req, res) => {
  const username = req._username
  const following = req.body.following

  User.findOneAndUpdate({ username }, { $set: { 'preferences.following': following } }, { new: true })
  .exec((error, user) => {
    if (error) return res.status(500).json({ error })
    res.status(200).json({ user })
  })
})

router.route('/users/self/commenting')
.put((req, res) => {
  const username = req._username
  const commenting = req.body.commenting

  User.findOneAndUpdate({ username }, { $set: { 'preferences.commenting': commenting } }, { new: true })
  .exec((error, user) => {
    if (error) return res.status(500).json({ error })
    res.status(200).json({ user })
  })
})

router.route('/users/self/liking')
.put((req, res) => {
  const username = req._username
  const liking = req.body.liking

  User.findOneAndUpdate({ username }, { $set: { 'preferences.liking': liking } }, { new: true })
  .exec((error, user) => {
    if (error) return res.status(500).json({ error })
    res.status(200).json({ user })
  })
})

router.route('/users/self/locations')
.put((req, res) => {
  const username = req._username
  const locations = req.body.locations

  // https://docs.mongodb.com/manual/reference/operator/update/set/#set-fields-in-embedded-documents
  User.findOneAndUpdate({ username }, { $set: { 'preferences.locations': locations } }, { new: true })
  .exec((error, user) => {
    if (error) return res.status(500).json({ error })
    res.status(200).json({ user })
  })
})

router.route('/users/self/tags')
.put((req, res) => {
  const username = req._username
  const tags = req.body.tags

  User.findOneAndUpdate({ username }, { $set: { 'preferences.tags': tags } }, { new: true })
  .exec((error, user) => {
    if (error) return res.status(500).json({ error })
    res.status(200).json({ user })
  })
})


router.route('/users/self/filtertags')
.put((req, res) => {
  const username = req._username
  const tag_blacklist = req.body.filtertags

  User.findOneAndUpdate({ username }, { $set: { 'preferences.tag_blacklist': tag_blacklist } }, { new: true })
  .exec((error, user) => {
    if (error) {
      winston.log(error)
      return res.status(500).json({ error })
    }
    res.status(200).json({ user })
  })
})

router.route('/users/self/filterusers')
.put((req, res) => {
  const username = req._username
  const username_blacklist = req.body.filterusers

  User.findOneAndUpdate({ username }, { $set: { 'preferences.username_blacklist': username_blacklist } }, { new: true })
  .exec((error, user) => {
    if (error) {
      winston.log(error)
      return res.status(500).json({ error })
    }
    res.status(200).json({ user })
  })
})

router.route('/users/self/filterkeys')
.put((req, res) => {
  const username = req._username
  const keyword_blacklist = req.body.filterkeys

  User.findOneAndUpdate({ username }, { $set: { 'preferences.keyword_blacklist': keyword_blacklist } }, { new: true })
  .exec((error, user) => {
    if (error) {
      winston.log(error)
      return res.status(500).json({ error })
    }
    res.status(200).json({ user })
  })
})

router.route('/users/self/payments')
.post((req, res) => {
  const username = req._username
  const payment = req.body.payment

  // TODO: validate payment
  PayPalService.getPaymentToken()
  .then((response) => {
    return response.body.access_token
  })
  .then((token) => {
    return PayPalService.getPaymentDetails(token, payment.paymentId)
  })
  .then((response) => {
    const { status, body } = response
    const { custom, amount } = body.transactions[0]
    const item_id = custom

    // TODO: convert this to Promises
    new Payment({
      paypal_id: body.id, // The schema will look if the id has been allready added
      item_id,
      amount: amount.total,
      payer: {
        payment_method: body.payer.payment_method,
        payer_info: {
          email: body.payer.payer_info.email,
          first_name: body.payer.payer_info.first_name,
          last_name: body.payer.payer_info.last_name,
          payer_id: body.payer.payer_info.payer_id,
          country_code: body.payer.payer_info.country_code
        }
      },
      username: req._username
    })
    .save((error, payment) => {

      if (error) {
        console.log(error)
        // TODO: handle correctly error that paypal_id purchase marks as duplicated
        return res.status(500).json({ error })
      }

      // Get the item properties from DB, rather to
      // getting them from user
      Item.findById(item_id)
      .exec((error, item) => {
        if (error) {
          winston.log(error)
          return res.status(500).json({ error })
        }

        // Add the number of days converted to miliseconds
        const timeToAdd = item.days*86400*1000

        User.findOne({ username: req._username })
        .exec((error, user) => {
          if (error) {
            console.log(error)
            return res.status(500).json({ error })
          }

          const now = Date.now()

          // Check if timeEnd has allready passed
          // 1491790971264
          if (user.timeEnd < now) {
            user.timeEnd = now + timeToAdd
          } else {
            user.timeEnd = user.timeEnd + timeToAdd
          }

          user.save((error, savedUser) => {
            if (error) {
              winston.log(error)
              return res.status(500).json({ error })
            }

            res.status(200).json({ user })
          })

        })

      })

    })

  })
  .catch((error) => {
    if (error) return res.status(500).json({ error })
  })

})

router.route('/payments')
.post((req, res) => {

  const item_id = req.body.item_id

  // Get the package ID from DB and get the cost and time, dont't get it from the user
  Item.findById(item_id)
  .exec((error, item) => {
    if (error) {
      winston.log(error)
      return res.status(500).json({ error })
    }

    const information = {
      'intent':'sale',
      'redirect_urls':{
        'return_url':"http://localhost:8080/time",
        'cancel_url':"http://localhost:8080/time"
      },
      'payer':{
        'payment_method': 'paypal'
      },
      'transactions': [
        {
          'amount':{
            'total': item.price,
            'currency': 'USD'
          },
          'custom': item._id,
          'description': item.description
        }
      ]
    }

    // Sent total and currency
    PayPalService.getPaymentToken()
    .then((response) => {
      return response.body.access_token
    })
    .then((access_token) => {
      return PayPalService.setPayment(access_token, information)
    })
    .then((response) => {
      return res.status(200).json({
        links: response.body.links,
        paymentId: response.body.id,
        transactions: response.body.transactions
      })
    })
    .catch((error) => {
      winston.log(error)
      return res.status(500).json({ error })
    })


  })

})

/* GET ID's FOR LOCATIONS ON IG */
router.route('/locations/translate/:location')
.get((req, res) => {
  const location = (req.params.location)
  // Return an empty string if there is no locations
  if (!location) return res.status(200).json(location)

  // Find any valid access_token
  Token.findOne({ 'dirty': false })
  .exec((error, admin) => {
    if (error) {
      winston.log(error)
      res.status(500).json({ error })
    }

    if (!admin)
      return res.status(503).json({ error: { message: 'No more valid access tokens in the server!' }})

      // Get coordinates for specified location
      let locationTags = []
      const coordinates = location.split(",")
      request.get({ url:'https://api.instagram.com/v1/locations/search?lat=' + coordinates[1] + '&lng=' + coordinates[0] + '&access_token=' + admin.access_token }, (error, response) => {
        if (error) return res.status(500).json({ error })

          let places = undefined

          try { // Set a safe json parse
            places = JSON.parse(response.body)
          } catch (error) { res.status(500).json({ error }) }

          /* Token has expired, mark access_token as dirty and trigger endpoint again */
          if (places.meta.error_type === "OAuthAccessTokenException"){
            // Mark as dirty
            Token.findOneAndUpdate({ 'access_token': admin.access_token }, { $set: { 'dirty': true } })
            .exec((error, user) => {
              if (error) return res.status(500).json({ error })
              //TODO: Update get route to global OWA domain
              //Trigger endpoint again 'till finding a valid access_token
              request.get({ url:'http://localhost:8080/v1/locations/translate/' + location, headers:{ 'Content-Type': 'application/x-www-form-urlencoded', 'authorization': req.headers.authorization }}, (error, response) => {
                  if (error) return res.status(500).json({ error })
                  try { // Set a safe json parse
                    body = JSON.parse(response.body)
                  } catch (error) { res.status(500).json({ error }) }
                  /* Return new response */
                  res.write(body)
                  res.end()
              })
            })
          }
          else {
            (places.data).forEach((place) => {
              // Only push if there are no errors in the id by IG
              if(place.id != 0) locationTags.push('l:'.concat(place.id))
            })
             res.write(locationTags.toString())
             res.end()
          }
      })
  })
})

/*
   MIDDLEWARE FOR TIME AVAILABLE CHECK

   Here we will check if our user endTime is greater than
   current time, so we weill know if his time has passed
   or not
*/

// router.use((req, res, next) => {
//   User.findOne({ username: req.body.username })
//   .exec((error, user) => {
//     if (error) return res.status(500).json({ error })
//     // Check if the user has remaining time
//     if (user.timeEnd > Date.now())
//       return next()
//     res.status(403).json({ error: { message: 'No time available' }})
//   })
// })

/* AUTOMATION INSTAGRAM PROCESS */
router.route('/automation/self/start')
.post((req, res) => {
    //TODO: Update password encryption logic
    const username = req.body.username
    User.findOne({ username })
    .exec((error, user) => {
      // Get user username, password and preferences
      const { username, password, preferences } = user

      // Get tags, locations and usernames array
      const { tags, locations } = preferences

      // Get if user set to active each activity
      const { liking, commenting, following } = preferences

      // Get if user has blacklisted something
      const { tag_blacklist, username_blacklist, keyword_blacklist } = preferences

      // Translate locations into IG codes. Each for every location
      let locationTags = []
      let counter = 0
      locations.forEach((location) => {
        request.get({ url:'http://localhost:8080/v1/locations/translate/' + location.coordinates, headers:{ 'Content-Type': 'application/json', 'authorization': req.headers.authorization }, body: JSON.stringify(location)}, (error, response) => {
            if (error) return res.status(500).json({ error })
            locationTags.push(response.body)
            counter ++
            if (counter === locations.length) {
                  new PythonShell('/lib/python/bot.py', { pythonOptions: ['-u'], args: [ username, password, locationTags ? tags.concat(locationTags) : tags, liking, following, commenting, tag_blacklist, username_blacklist, keyword_blacklist]})
                  .on('message', (message) => {
                      // received a message sent from the Python script (a simple "print" statement)
                      process.env.NODE_ENV === 'development' ? console.log(message) : null
                  })
                  .end((err) => {
                    if (err) {
                      winston.log(error, username)
                      throw err
                    }
                    process.env.NODE_ENV === 'development' ? console.log('Finished') : null
                  })

                 res.status(200).json({'message': 'The automation has started'})
            }
            })
          })
        })
      })


      //   new PythonShell('/lib/python/bot.py', { pythonOptions: ['-u'], args: [ username, password, locationTags ? tags.concat(locationTags) : tags, liking, following, commenting, tag_blacklist, username_blacklist, keyword_blacklist]})
      //   .on('message', (message) => {
      //       // received a message sent from the Python script (a simple "print" statement)
      //       process.env.NODE_ENV === 'development' ? console.log(message) : null
      //   })
      //   .end((err) => {
      //     if (err) {
      //       winston.log(error, username)
      //       throw err
      //     }
      //     process.env.NODE_ENV === 'development' ? console.log('Finished') : null
      //   })
       //
      //  res.status(200).json({'message': 'The automation has started'})


module.exports = router
