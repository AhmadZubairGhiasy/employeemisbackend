const express = require('express')
const Router = express.Router()




// defining schema
const userProjectSchema = require('../../../monodb/ProjectScheam')
const user = require('../../../monodb/Dbschema')




Router.get('/',async (req, res)=>{




    

    //console.log(req.body)
    const id = await user.findOne({email:req.body.email})

    //console.log(id)

    const foundproject = await userProjectSchema.find({assignedEmployee:id._id})
    //console.log(foundproject)
    if(foundproject.length ===0){
         res.status(401)
        res.send("project not found")
        return
    }



    res.send(foundproject)
})





module.exports = Router