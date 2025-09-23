const express = require('express')
const Router = express.Router()



// defining schema
const userattend = require('../../../monodb/EmployeeAttendence')
const user = require('../../../monodb/Dbschema')




Router.post('/',async (req, res)=>{



    console.log("req data is: ",req.body)

    const founduser = await user.findOne({email:req.body.reqdata.email})

    const admindetails = await user.findOne({email:req.body.email})
    console.log("user data is: ", founduser)
    

    if(!founduser){
        res.send("not user founded")
        return
    }

    if(admindetails.role !=="admin"){
        res.send("your are not admin so can't add attend")
        return
    }


    //console.log(founduser) 

    const projectdata = req.body.reqdata

    console.log(projectdata)


    const foundattend = await userattend.find({employeeId:projectdata.employeeId,date:projectdata.date})


       if(!projectdata.employeeId|| !projectdata.status||!projectdata.date){
        res.send("one of the field is empty ❌")
        return
    }

    console.log("founded attend: ",foundattend)
    if(foundattend.length !==0){
        await userattend.updateOne({_id:foundattend._id},{$set:projectdata})
        res.send("Attend updated ✔️")
        return
    }

   
    
 

    if(projectdata.status ==="present" || projectdata.status ==="late"){

        if(!projectdata.inTime || !projectdata.outTime){
             res.send("please add in and out time ❌")
             return
        }
        
    }


   

    await userattend.create(projectdata)
    res.send("Attend added ✔️")
})



module.exports = Router