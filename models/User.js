const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  fullName: String,
  username: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  website: String,
  profile_picture: String,
  instagram: {
    id: String,
    bio: String
  },
  timeEnd: { type: Date, required: true, default: Date.now() },
  payments: [ String ],
  preferences: {
    liking: Boolean,
    following: Boolean,
    commenting: Boolean,
    tags: [ String ],
    locations: [ String ],
    gender: Number,
    usernames: [ String ]
  }
})

module.exports = mongoose.model('User', schema)
