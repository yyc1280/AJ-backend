const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    required: true,
  },

  MerchantTradeNo: {
    type: String,
    required: true,
  },
  MerchantTradeDate: {
    type: String,
    required: true,
  },
  TotalAmount: {
    type: String,
    required: true,
  },

  ItemName: {
    type: [String],
  },

  success: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model("Payment", paymentSchema)
