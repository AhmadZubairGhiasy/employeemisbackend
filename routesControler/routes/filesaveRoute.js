const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')

const User = require('../../monodb/Dbschema')

// used packages
const multer = require('multer')
const path = require("path")

const fs = require('fs')


const verifyJwt = require("./middlewares/handleauth")




const storage = multer.diskStorage({
 destination: (req,file,cb)=>{
  
    const id = req.query.id

    let uploadpath = `uploads/${id||"no-id"}/`
    if(!fs.existsSync(uploadfolder)){
      fs.mkdirSync(uploadpath, {recursive:true})
    }

   
   cb(null, uploadpath );
 },
 filename:(req,file,cb)=>{
 
      
   
      
    
   cb(null, `profilephoto.jpg`);
 }
})

const uploadfolder = multer({storage});

Router.post('/', uploadfolder.any(),async (req, res)=>{

      
     
       
     if(!mongoose.Types.ObjectId.isValid(req.body.id)){
        res.send('add a valid 24 character hex Id')
        return
      }

      const founduser = await User.findById(req.body.id)

      


      
      if(!founduser) {
        res.send('user not found')}




       

      let PhotoUrl =  path.join('uploads',req.body.id,"profilephoto.jpg")
      
      console.log(PhotoUrl)

      

     
       await User.updateOne({_id: req.body.id},{$set:{PhotoUrl:PhotoUrl}})


        
        res.status(200)
        res.send("photo set")

 


  

})




module.exports = Router