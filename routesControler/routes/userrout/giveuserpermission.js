const express = require('express')
const Router = express.Router()



// defining schema

const user = require('../../../monodb/Dbschema')
const pendinguser = require('../../../monodb/Noneauthu')





Router.post('/',async (req, res)=>{

   
    const admindetails = await user.findOne({email:req.body.email})
    if(admindetails.role !=="admin"){
        res.send("your are not admin so can't add attend")
        return
    }


    const founduser = await pendinguser.findOne({_id: req.body.reqdata.id})
       const usertobeadd = {...founduser}._doc
        delete usertobeadd._id
     

    if(req.body.reqdata.action ==="accept"){

      
        await user.create(usertobeadd)
        await pendinguser.deleteOne({_id:req.body.reqdata.id})
     
         
        
                  

        res.send("user accepted")
        return

    }
     if(req.body.reqdata.action ==="reject"){
            
           await pendinguser.deleteOne({_id: founduser._id})
           res.send("user rejected")
           return
    }

    res.send("you didn't specify action")

  
})



module.exports = Router