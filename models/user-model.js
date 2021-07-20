const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  //Google Login
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  googleID: {
    type: String,
  },

  thumbnail: {
    type: String,
  },
  //Local Login
  email: {
    type: String,
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 1024,
  },
})

module.exports = mongoose.model("User", userSchema)
