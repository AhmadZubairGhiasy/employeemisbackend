const express = require('express')
const Router = express.Router()


const mongoose = require('mongoose')
const User = require('../../../monodb/Dbschema')








const verifyJwt = require('../middlewares/handleauth')



Router.get('/', verifyJwt ,  async (req,res)=>{

   
      console.log(req.body)

    const userinfo = req.body
  
  if(!userinfo.email){
    res.send("no email found")
    return
  }

    let founduser = await User.findOne({email: userinfo.email})


    if(!founduser){
      res.send(`no user found with email: ${userinfo.email}`)
      return
    }

   
    let id = founduser._id

    // escaping from password
    const datatobesend = Object.fromEntries(Object.entries(founduser._doc).filter(([key])=> key!== "password"))
    
      //console.log(datatobesend) // for testing
        
  
      
     res.send(datatobesend)
      
      
})



module.exports = Router