const express = require('express')
const Router = express.Router()



// defining schema
const userattend = require('../../../monodb/EmployeeAttendence')
const user = require('../../../monodb/Dbschema')




Router.post('/',async (req, res)=>{



    console.log("req data is: ",req.body)

   
    const admindetails = await user.findOne({email:req.body.email})
   
    

    if(admindetails.role !=="admin"){
        res.send("your are not admin so can't add attend")
        return
    }


    //console.log(founduser) 

    const projectdata = req.body.reqdata

       
 
        await userattend.updateOne({_id:projectdata._id},{$set:projectdata})
        res.send("Attend updated ✔️")
  
})



module.exports = Router