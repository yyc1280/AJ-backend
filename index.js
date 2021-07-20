port = process.env.PORT || 8080
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const authRoute = require("./routes/auth-route")
const productRoute = require("./routes/product-route")
const paymentRoute = require("./routes/payment-route")

const MongoStore = require("connect-mongo")
// require("ECPAY_Payment_node_js")
require("./ECPAY_Payment_node_js")

require("./config/passport")
const cors = require("cors")
const passport = require("passport")

const session = require("express-session")

mongoose.set("useCreateIndex", true)
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected~")
  })
  .catch(e => {
    console.log(e)
  })

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: [process.env.BS_URL, process.env.FE_URL],
    // origin: process.env.FE_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // allow session cookie from browser to pass through
  })
)
app.set("trust proxy", 1)
app.enable("trust proxy")
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    store: MongoStore.create({ mongoUrl: process.env.DB }),
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRoute)
app.use("/product", productRoute)
app.use("/payment", paymentRoute)

app.get("/", (req, res) => {
  res.send("hello it's me")
})

app.listen(port, () => {
  console.log("server running~")
})
