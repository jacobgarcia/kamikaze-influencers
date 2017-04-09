const path = require('path')
const request = require('request')
const config = require(path.resolve('config/config.js'))
//const paypalUrl = 'https://api.sandbox.paypal.com/v1'
const User = require(path.resolve('models/User'))

class InstagramService {
  constructor() {

  }

  static getToken() {

  }

  static signinUser(user) {
    return new Promise((resolve, reject) => {

      User.findOne({ username: user.username })
      .exec((error, foundUser) => {
        if (error) return reject({ error, status: 500 })
        if (!foundUser) {
          new User({
            fullName: user.full_name,
            username: user.username,
            website: user.website,
            profile_picture: user.profile_picture,
            instagram: {
              id: user.id,
              bio: user.bio
            }
          })
          .save((error, createdUser) => {
            if (error)
              return reject({ error, status: 500 })
            resolve({ status: 201, user: createdUser })
          })
        } else { // Else is important, otherwise iw will run before saving user
          resolve({status: 200, user: foundUser})
        }
      })

    })
  }


}

module.exports = InstagramService
