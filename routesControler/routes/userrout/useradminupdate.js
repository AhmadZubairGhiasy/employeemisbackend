const express = require('express')
const Router = express.Router()



// defining schema

const user = require('../../../monodb/Dbschema')




Router.post('/',async (req, res)=>{



    console.log("req data is: ",req.body)

   
    const admindetails = await user.findOne({email:req.body.email})
   
    

    if(admindetails.role !=="admin"){
        res.send("your are not admin so can't add attend")
        return
    }


    //console.log(founduser) 

    const userdata = req.body.reqdata

    if(!userdata._id){
        res.send("no user id sent")
        return
    }
       
 
        await user.updateOne({_id:userdata._id},{$set:userdata})
        res.send("User updated ✔️")
  
})



module.exports = Router