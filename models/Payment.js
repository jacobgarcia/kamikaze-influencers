const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  paypal: {
    id: { type: String, required: true },
    date: { type: String, required: true },
    amount: Number
  }
})

module.exports = schema
