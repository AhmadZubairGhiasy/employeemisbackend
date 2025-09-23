const express = require('express')
const Router = express.Router()



// defining schema
const userProjectSchema = require('../../../monodb/ProjectScheam')
const user = require('./../../../monodb/Dbschema')




Router.post('/',async (req, res)=>{



    //sconsole.log("req data is: ",req.body)

    const founduser = await user.findOne({email:req.body.email})


    if(!founduser){
        res.send("not user founded")
        return
    }



    //console.log(founduser) 

    const projectdata = req.body.reqdata

    if(!projectdata.name|| !projectdata.pstatus|| !projectdata.pdescription||!projectdata.pdate||!projectdata.pmonth){
        res.send("one of the field is empty")
        return
    }

    const project ={
            assignedEmployee:founduser._id,
            name:projectdata.name,
            status:projectdata.pstatus,
            description:projectdata.pdescription,
            infoData:projectdata.pdate,
            month:projectdata.pmonth

    }
   // console.log(project)


   

    userProjectSchema.create(project)
    res.send("project added")
})



module.exports = Router