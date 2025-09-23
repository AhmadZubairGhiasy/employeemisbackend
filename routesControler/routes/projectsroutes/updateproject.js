const express = require('express')
const Router = express.Router()



// defining schema
const userProjectSchema = require('../../../monodb/ProjectScheam')
const user = require('../../../monodb/Dbschema')
const { id } = require('date-fns/locale')




Router.post('/',async (req, res)=>{



    const projectdata = req.body.reqdata

    if(!projectdata.name|| !projectdata.pstatus|| !projectdata.pdescription||!projectdata.pdate||!projectdata.pmonth){
        res.send("one of the field is empty")
        return
    }


    
    const projectid = req.body.reqdata.id

   
    console.log(projectid)


   

   await userProjectSchema.updateOne({_id:projectid},{$set:{name:projectdata.name,status:projectdata.pstatus,description:projectdata.pdescription, infoData:projectdata.pdate, month:projectdata.pmonth}})
    res.send("project updated")
})



module.exports = Router