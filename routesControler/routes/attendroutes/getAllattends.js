const express = require('express')
const Router = express.Router()



// defining schema
const userattend = require('../../../monodb/EmployeeAttendence')
const user = require('../../../monodb/Dbschema')


const date = new Date()


Router.get('/',async (req, res)=>{


      const wanteddate =  req.query.id

    console.log("req data is: ",req.body)

    const founduser = await user.findOne({email:req.body.email})

    if(!founduser){
         res.status(404)
        res.send("not user founded")
        return
    }

    
    if(founduser.role !=="admin" ){
         res.status(404)
        res.send("you are not admin so can't access the attends")
        return
    }

    const userattendens = await userattend.find({date:wanteddate})
    console.log("user attend to be send is: ", userattend)


    if(!userattendens){
         res.status(404)
        res.send("not attens added yet")
        return
    }

   
    res.send(userattendens)
})



module.exports = Router