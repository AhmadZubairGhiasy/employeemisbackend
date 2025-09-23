const express = require('express')
const Router = express.Router()




// defining schema
const userProjectSchema = require('../../../monodb/ProjectScheam')
const user = require('../../../monodb/Dbschema')




Router.get('/',async (req, res)=>{




    const projectid = req.query.id

    console.log("user id is: ", projectid)

    //console.log(req.body)
    const id = await user.findOne({email:req.body.email})
        

     //console.log(id)

    if(id.role !=="admin"){
        res.status(401)
        res.send("only admin can have all project")
        return
    }
 
   

    const foundproject = await userProjectSchema.find({assignedEmployee:projectid})
    //console.log(foundproject)
    if(foundproject.length ===0){
        res.send("project not found")
        return
    }



    res.send(foundproject)
})





module.exports = Router