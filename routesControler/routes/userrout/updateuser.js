const express = require('express')
const Router = express.Router()



// defining schema

const user = require('../../../monodb/Dbschema')




Router.post('/',async (req, res)=>{



    console.log("req data is: ",req.body)

   
    const founduser = await user.findOne({email:req.body.email})
   
    

    if(!founduser){
        res.send("your are not admin so can't add a")
        return
    }


    //console.log(founduser) 

    const userdata = req.body.reqdata

       
 
        await user.updateOne({_id:founduser.id},{$set:userdata})
        res.send("User updated ✔️")
  
})



module.exports = Router