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

router.route('/users/self')
.get((req, res) => {
  const { access_token } = req.query
  request(`${baseUrl}/users/self?access_token=${access_token}`, (error, response) => {
    if (error) return res.status(500).json(error)
    //Get data and meta attributes from response.body object
    const { data, meta } = JSON.parse(response.body)
    //Send the meta.code and data from the request
    res.status(meta.code).json(data)
  })
})

module.exports = router
