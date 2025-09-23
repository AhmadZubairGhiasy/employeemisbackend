const express = require('express')
const Router = express.Router()



const bcrypt = require('bcrypt')

const User = require('../../../monodb/Noneauthu')


Router.post('/',  async (req, res)=> {
  
 
  const newuser = req.body
  let pwd = newuser.password
  pwd = await bcrypt.hash(pwd,10)


   
    let founduser = await User.findOne({email:req.body.email})
    console.log(founduser)
    if(founduser){
      res.statusCode = 403
      res.send(`ID: ${founduser.email} is allready register`)
      
      console.log(founduser)
      return
    }

  newuser.password = pwd
  
     
        const storeResult = User.create(newuser)


        alluser = await User.findOne({email: req.body.email}).exec()
        
      res.send("you are registed")
    
   
    
})


module.exports = Router