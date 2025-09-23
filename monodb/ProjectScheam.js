const {Schema, default: mongoose} = require('mongoose')

const userProjectSchema =  new Schema({ 
    assignedEmployee:{type: mongoose.Schema.Types.ObjectId, ref: 'Dbschema.js', required: true,default:""},
    name:{type:String, required:true, default:""},
    status:{type: String, required: true, default:""},
    description:{type:String,default:""},
    infoData: {type: Date, required:true,default:""},
    month:{type:String, require,default:""},
      issudate: {type: Date,default:""},
      deadlinedate: {type: Date, default:""},

    
     


})

module.exports = mongoose.model("ProjectScheam", userProjectSchema )