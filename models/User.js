const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  fullName: String,
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  notifications: [ Number ],
  website: String,
  profile_picture: String,
  // Accout info for metrics
  likes: [ String ],
  comments: [ String ],
  follows: [ String ],
  // End accout info for metrics
  instagram: {
    id: String,
    bio: String
  },
  timeEnd: { type: Number, required: true, default: Date.now() },
  preferences: {
    liking: { type: Boolean, default: false },
    following: { type: Boolean, default: false },
    commenting: { type: Boolean, default: false },
    tags: [ String ],
    locations: [ String ],
    tag_blacklist: [ String ],
    username_blacklist: [ String ],
    keyword_blacklist: [ String ],
    comment_text: String
  }
})

module.exports = mongoose.model('User', schema)
