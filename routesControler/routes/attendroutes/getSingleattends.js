const express = require('express')
const Router = express.Router()



// defining schema
const userattend = require('../../../monodb/EmployeeAttendence')
const user = require('../../../monodb/Dbschema')
const { eachWeekOfInterval } = require('date-fns')




Router.get('/',async (req, res)=>{


    
    console.log("req data is: ", req.query.month)

    const founduser = await user.findOne({email:req.body.email})

    if(!founduser){
        res.status(404)
        res.send("not user founded")
        return
    }

    let userattendens;

    if(req.query.month){
        const validmonth =Number( req.query.month.split('-')[1]) -1;
        userattendens = await userattend.find({employeeId:founduser._id, month:validmonth})
        console.log("user attend to be send is: ", userattend)

        if(!userattend){
            res.send("you have not attends yet")
            return
        }

        res.send(userattendens)
        return
    }

    userattendens = await userattend.find({employeeId:founduser._id})
    console.log("user attend to be send is: ", userattend)



    if(!userattendens){
         res.status(404)
        res.send("you have not attends yet")
        return
    }

   
    res.send(userattendens)
})



module.exports = Router