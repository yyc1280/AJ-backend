const router = require("express").Router()
const Payment = require("../models/payment-model")
const Product = require("../models/product-model")
// const ecpay_payment = require("../node_modules/ECPAY_Payment_node_js/lib/ecpay_payment")
const ecpay_payment = require("../ECPAY_Payment_node_js//lib/ecpay_payment")

const getUID = () => {
  return (
    ("" + Math.random()).substring(2, 12) +
    ("" + Math.random()).substring(6, 16)
  )
}
const onTimeValue = function () {
  var date = new Date()
  var mm = date.getMonth() + 1
  var dd = date.getDate()
  var hh = date.getHours()
  var mi = date.getMinutes()
  var ss = date.getSeconds()

  return [
    date.getFullYear(),
    "/" + (mm > 9 ? "" : "0") + mm,
    "/" + (dd > 9 ? "" : "0") + dd,
    " " + (hh > 9 ? "" : "0") + hh,
    ":" + (mi > 9 ? "" : "0") + mi,
    ":" + (ss > 9 ? "" : "0") + ss,
  ].join("")
}
//

let inv_params = {}

router.post("/", async (req, res) => {
  const { names, sum } = req.body

  const base_param = {
    MerchantTradeNo: getUID(),
    MerchantTradeDate: onTimeValue(),
    TotalAmount: sum.toString(),
    TradeDesc: "你的訂單",
    ItemName: names.join("#"),
    ReturnURL: process.env.BE_URL + "/payment/returnURL",
    OrderResultURL: process.env.BE_URL + "/payment/orderResultURL",
  }
  const newPayment = new Payment({
    user: req.user._id,
    email: req.user.email,
    MerchantTradeNo: base_param.MerchantTradeNo,
    MerchantTradeDate: base_param.MerchantTradeDate,
    TotalAmount: base_param.TotalAmount,
    ItemName: names,
  })
  try {
    await newPayment.save()
    // const options = require("../node_modules/ECPAY_Payment_node_js/conf/config-example")
    const options = require("../ECPAY_Payment_node_js/conf/config-example")
    let create = new ecpay_payment(options)
    let htm = create.payment_client.aio_check_out_credit_onetime(
      (parameters = base_param),
      (invoice = inv_params)
    )

    res.send(htm)
  } catch (err) {
    console.log(err)
  }
})

router.post("/returnURL", async (req, res) => {
  const { RtnCode, MerchantTradeNo } = req.body

  if (RtnCode === "1") {
    try {
      const payment = await Payment.findOneAndUpdate(
        { MerchantTradeNo },
        { success: true }
      )

      res.send("1|OK")
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  } else {
    res.send(0 | err)
  }
})

router.post("/orderResultURL", (req, res) => {
  res.redirect(process.env.FE_URL + "/success")
})

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id, success: true })
    res.send(payments)
  } catch (err) {
    console.log(err)
  }
})

router.get("/allRecords", async (req, res) => {
  try {
    const payments = await Payment.find({ success: true })
    res.send(payments)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

module.exports = router
