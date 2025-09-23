const express = require('express')
const Router = express.Router()



// defining schema


const pendinguser = require('../../../monodb/Noneauthu')
const user = require('../../../monodb/Dbschema')




Router.get('/',async (req, res)=>{


    console.log("get pending user called")

// checking admin roles
    const admindetails = await user.findOne({email:req.body.email})
    if(admindetails.role !=="admin"){
        res.send("your are not admin so can't add attend")
        return
    }


    const users = await pendinguser.find({})
    console.log(users)

    res.send(users)
  
})



module.exports = Router