const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Location = new Schema({
    description: String,
    coordinates: String
},{ _id : false })

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
  unfollows: [ String ],
  // End accout info for metrics
  instagram: {
    id: String,
    bio: String
  },
  timeEnd: { type: Number, required: true, default: Date.now() },
  fameEnd: { type: Number, required: true, default: Date.now() }, //Hall of fame time
  preferences: {
    liking: { type: Boolean, default: false },
    following: { type: Boolean, default: false },
    commenting: { type: Boolean, default: false },
    unfollowing: { type: Boolean, default: false },
    tags: [ String ],
    locations: [ Location ],
    filtertags: [ String ],
    filterusers: [ String ],
    filterkeys: [ String ],
    comment_text: { type: String, default: null}
  },
  fameFollowers: [ String ],
  toFollow: [ String ],
  joinDate: { type: Number, required: true, default: Date.now() }, //Statistics purposes
  paidUser: { type: Boolean, default: false },
  automationActive: { type: Boolean, default: false }
})

module.exports = mongoose.model('User', schema)
