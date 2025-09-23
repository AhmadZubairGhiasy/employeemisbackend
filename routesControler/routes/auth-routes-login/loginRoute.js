const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')



const jwt = require('jsonwebtoken')
require('dotenv').config()




const User = require('../../../monodb/Dbschema')








Router.post('/',  async (req,res)=>{




  console.log(req.body)


    const userinfo = req.body
    const pwd = userinfo.password

    if(!userinfo.email|| !userinfo.password){
      res.statusCode = 404
      res.send("email and password are require")
      return
    }

    let founduser = await User.findOne({email: userinfo.email})


    if(!founduser){
      res.statusCode = 404
      res.send(`No user found with email: ${userinfo.email}`)
      return
    }

   
    let id = founduser._id


    
    
  
    const pwdmatch = await bcrypt.compare(pwd, founduser.password)
    if(!pwdmatch){
        res.statusCode = 404
        res.send(`Email with password not matched`)
      return
    }


      
    const accessToken = jwt.sign({

      "username": founduser.email
    }, 
    process.env.ACCESS_TOKEN_SECRET_KEY, 
    {expiresIn:'60s'})

     const refreshToken = jwt.sign({

      "username": founduser.email
    }, 
    process.env.REFRESH_TOKEN_SECRET_KEY, 
    {expiresIn:'1d'})


  User.updateOne({_id: id},{$set:{refreshToken: refreshToken}})







    // escaping from password
    //const datatobesend = Object.fromEntries(Object.entries(founduser._doc).filter(([key])=> key!== "password"))
    
      //console.log(datatobesend) // for testing
        
        

      

    
      
      res.cookie("token", refreshToken, {httpOnly: true, secure: false, sameSite: "Lax", maxAge: 24 * 60 * 60 * 1000})
      res.json("you loged")
    

      
      
})



module.exports = Router