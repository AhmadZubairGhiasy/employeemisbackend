const express = require('express')
const Router = express.Router()



// defining schema
const userattendence = require('../../monodb/EmployeeAttendence')
const userproject = require('../../monodb/ProjectScheam')
const user = require('../../monodb/Dbschema')




Router.get('/',async (req, res)=>{


const month = ['jan','feb','march','apr','may','june','jully','agu','sep','oct','nov','dec']

    console.log("admin requested")


const reqUserId = req.query.id

const admindetails = await user.findOne({email:req.body.email})
       
        
    
    if(admindetails.role!=="admin"){
            res.send("your are not admin")
            return
        }



const founduser = await user.findOne({_id: reqUserId})
console.log("found user is: ", founduser)

    const userallattendence = await userattendence.find({employeeId:reqUserId})

    const getmonthsortatted = (index)=>{   
    const filterattend = userallattendence.filter(a=>a.month===`${index}`).length
     const present = userallattendence.filter(a=>a.month===`${index}`&&a.status==="present").length
      const absent = userallattendence.filter(a=>a.month===`${index}`&&a.status==="absent").length
       const excuse = userallattendence.filter(a=>a.month===`${index}`&&a.status==="excuse").length
        const late = userallattendence.filter(a=>a.month===`${index}`&&a.status==="late").length

    return {
        alldays:filterattend,
        present,
        absent,
        excuse,
        late
    }
    } 

    const monthlyattend = month.map((m,index)=>{
        return {
            month:m,
            data:getmonthsortatted(index),
           
        }
    })




    const userallproject = await userproject.find({assignedEmployee:reqUserId})

    console.log("all proejct is: ", userallproject)
    const sortprojectsbymonth = (index)=>{
        const allproject = userallproject.filter(p=>p.month===index).length
        const completed = userallproject.filter(p=> p.month===index&&p.status==="completed").length
        const pending = userallproject.filter(p=> p.month===index&&p.status==="pending").length

        return {
            allproject,
            completed,
            pending,
        }
    }



    const monthlyproject = month.map((m)=>{
        return {
            month:m,
            data:sortprojectsbymonth(m),
           
        }
    })




  
    



    res.send({monthlyattend,monthlyproject})
})



module.exports = Router