const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  username:{
    type: String,
    required: true
  },
  access_token:{
    type: String,
    required: true
  },
  dirty: Boolean
})

module.exports = mongoose.model('Token', schema)
