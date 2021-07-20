const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")

const User = require("../models/user-model")

passport.serializeUser((user, done) => {
  console.log("serializing")
  done(null, user._id)
})

passport.deserializeUser((_id, done) => {
  console.log("deserializeUser")
  User.findById({ _id }).then(user => {
    console.log("found user")
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(foundUser => {
        if (foundUser) {
          console.log("user exist")
          done(null, foundUser)
        } else {
          new User({
            name: profile.displayName,
            googleID: profile.id,
            thumbnail: profile.photos[0].value,
            email: profile.emails[0].value,
          })
            .save()
            .then(newUser => {
              console.log("user created")
              done(null, newUser)
            })
        }
      })
    }
  )
)
