const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const path = require('path')
const bcrypt = require('bcrypt-nodejs')
const router = express.Router()

const config = require(path.resolve('config/config.js'))

const ExpressBrute = require('express-brute')
const MongoStore = require('express-brute-mongo')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const store = new MongoStore((ready) => {
  MongoClient.connect(config.database, (err, db) => {
    if (err) throw err
    ready(db.collection('bruteforce-store'))
  })
})
const bruteforce = new ExpressBrute(store)

mongoose.connect(config.database)

//Authenticate
router.route('/authenticate')
.get((req, res) => {

  const token = req.headers['x-access-token']
  if (!token) return res.status(403).json({ error: { message: 'No token provided' } })

  jwt.verify(token, config.secret, (err) => {
    if (err) return res.status(400).json({ error: err })

    res.status(200).json({ message: 'Your token is valid' })
  })
})
.post(bruteforce.prevent, (req, res) => {
  const userId = req.body.username || req.body.email
  const password = req.body.password

  if (!user || user === undefined) return res.status(403).json({ error: { message: 'No user credentials provided' } })

  User.findOne({$or: [{ email: userId }, { username: userId }] })
  .select('name username password')
  .exec((err, user) => {
    if (err) return res.status(500).json({ error: err })
    if (!user || user === undefined) return res.status(403).json({ error: { message: 'User or password incorrect.' } })
    if (!user.comparePassord(req.body.password + config.secret)) return res.status(403).json({ error: { message: 'User or password incorrect.' } })

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: 604800000 })
    res.status(200).json({ token: token, message: 'Authentication succeed', user: user})
  })
})

//Middleware
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')

  const token = req.headers['x-access-token']

  if (!token) return res.status(403).json({ error: { message: 'No token provided' } })

  jwt.decode(token, config.jwtSecret, (err, decoded) {
    return res.status(400).json({ error: err })
    req._UID = decoded._id
    next()
  })
})

module.exports = router
