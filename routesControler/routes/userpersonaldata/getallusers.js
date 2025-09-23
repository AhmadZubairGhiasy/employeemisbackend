const express = require('express')
const Router = express.Router()


const mongoose = require('mongoose')
const User = require('../../../monodb/Dbschema')











Router.get('/',  async (req,res)=>{

   
      
  
      
     res.send("hello")
      
      
})



module.exports = Router