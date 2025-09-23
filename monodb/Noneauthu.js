const {Schema, default: mongoose} = require('mongoose')

const noneauthu =  new Schema({ 
    
   name: {type:String, required : true},
    email:{type:String, required: true, unique: true},
    password:{type:String, required:true , unique:true, default : ""},
    age:{type: Number, min:16 , default: 18},
    PhotoUrl: {type: String, default:''},
    phone:{type: String, default:''},
    address:{type: String, default:''},
    department:{type: String, default:''},
    role:{type: String, default: 'user',enum: ["user", "editor", "admin"]},
    createAt: {type:Date, default: Date.now},
    refreshToken:{type:String, default: ""},

})

module.exports = mongoose.model("Noneauthu", noneauthu)