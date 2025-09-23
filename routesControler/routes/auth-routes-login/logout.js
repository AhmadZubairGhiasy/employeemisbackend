const express = require('express')
const Router = express.Router()



Router.get("/", (req,res)=>{
    res.clearCookie("token")
    res.send("you loged out")
})



module.exports = Router