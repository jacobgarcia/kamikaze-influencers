const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  paypal_id: { type: String, required: true, unique: true },
  item_id: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  amount: Number,
  payer: {
    payment_method: String,
    payer_info: {
      email: String,
      first_name: String,
      last_name: String,
      payer_id: String,
      country_code: String
    }
  },
  username: { type: String, ref: 'User', required: true },
  date: { type: Number, default: Date.now(), required: true}
})

module.exports = mongoose.model('Payment', schema)
