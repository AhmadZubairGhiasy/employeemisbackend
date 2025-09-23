
const {Schema, default: mongoose} = require('mongoose')

const date = new Date()



const userattendenceschema =  new Schema({ 
   employeeId:{type: mongoose.Schema.Types.ObjectId, ref: 'Dbschema.js', required: true},
   inTime:{type:String,default:`${date.getTime()}`},
   outTime: {type: String, default:""},
   date:{type:String,default:`${date.toString()}`},
   status: {type: String, enum: ["present", "absent", "late", "excuse"], default: "Present"},
    month:{type:String, default:`${date.getMonth()}`},
   year:{type:String, default:`${date.getFullYear()}`},
})

module.exports = mongoose.model("EmployeeAttendence", userattendenceschema)