const express = require('express')
const Router = express.Router()




// defining schema
const userProjectSchema = require('../../../monodb/ProjectScheam')





Router.post('/',async (req, res)=>{


    const id = req.body.reqdata.id
   // console.log(req.body)

    await userProjectSchema.deleteOne({_id: id})

    



    

    res.send("project deleted")
})





module.exports = Router