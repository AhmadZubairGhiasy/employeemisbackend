const express = require('express')
const Router = express.Router()

const bcrypt = require('bcrypt')


// defining schema

const user = require('../../../monodb/Dbschema')




Router.post('/',async (req, res)=>{






   
    const founduser = await user.findOne({email:req.body.email})
   
    

    if(!founduser){
        res.send("no user founded")
        return
    }



    const reqdata = req.body.reqdata


    const pwdmatch = await bcrypt.compare(reqdata.oldpassword, founduser.password)

    if(!pwdmatch){
        res.send("old password not matched")
        return
    }

    if(reqdata.confirmpassword !== reqdata.newpassword){
        res.send("confirm password not matched")
        return
    }
    

    const newpassword =  await bcrypt.hash(reqdata.newpassword,10)


    await user.updateOne({_id:founduser._id},{$set:{password:newpassword}})


    res.send("password updated")
  

 
  
})



module.exports = Router