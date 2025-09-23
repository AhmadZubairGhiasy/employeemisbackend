const express = require('express')
const Router = express.Router()
const path = require('path')



Router.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'pages', 'home.html'))
  res.send("wellcome to home page")
})


module.exports = Router