const router = require("express").Router()
const Product = require("../models/product-model")
const multer = require("multer")

const upload = multer()

router.post("/", upload.single("image"), async (req, res) => {
  const { name, price, type } = req.body

  const newP = new Product({
    name,
    price,
    type,
    image: req.file.buffer,
  })

  try {
    await newP.save()
    res.send({ msg: "post succeeded" })
  } catch (err) {
    res.status(404).send(err)
  }
})

router.get("/image/:_id", async (req, res) => {
  try {
    const product = await Product.findById(req.params._id)

    res.set("Content-Type", "image/png")
    res.send(product.image)
  } catch (error) {
    res.status(404).send()
  }
})

router.get("/", async (req, res) => {
  try {
    const product = await Product.find()
    res.send(product)
  } catch (err) {
    console.log(err)
  }
})

router.delete("/:_id", async (req, res) => {
  const { _id } = req.params
  try {
    await Product.findOneAndDelete({ _id })
    res.send({ msg: "deleted" })
  } catch (err) {
    console.log(err)
    res.status(404).send(err)
  }
})

module.exports = router
