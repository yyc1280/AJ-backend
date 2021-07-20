const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    required: true,

    type: String,
  },

  image: {
    required: true,
    type: Buffer,
  },
  price: {
    required: true,

    type: Number,
  },
})

module.exports = mongoose.model("Product", productSchema)
