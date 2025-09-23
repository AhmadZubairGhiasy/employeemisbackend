const express = require('express')
const Router = express.Router()
const fspromises = require('fs').promises 
const path = require('path')


const User = require('../../../monodb/Dbschema')


Router.get('/', async (req, res) => {
  
    const useridet = req.body.email

    const roleverifyuser = await User.findOne({email:useridet})
     //console.log("roleverifyuser is: ",roleverifyuser)

    if(roleverifyuser.role !== "admin"){
       res.status(401)
      res.send("only admin can access all user data")
      return
    }

    const alluser = await User.find({})

    //console.log("all users are: ",alluser)


    res.send(alluser)
    
  

})

module.exports = Router