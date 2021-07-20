const router = require("express").Router()
const passport = require("passport")
const User = require("../models/user-model")

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
)

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  if (req.session.returnTo) {
    let newPath = req.session.returnTo
    req.session.returnTo = ""
    res.redirect(newPath)
  } else {
    res.redirect(process.env.FE_URL)
  }
})

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    })
  }
})

router.get("/logout", (req, res) => {
  req.logOut()
  res.send()
})

module.exports = router
