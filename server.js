const express = require('express')
const app = express()
const port = process.env.PORT || 3500
const cors = require('cors')
const path =require('path')
require('dotenv').config()

// handiling mongo db connection 

const mongoose = require("mongoose")

const mongodburl = process.env.DB_URL
mongoose.connect(`${mongodburl}`).then(()=>{
    console.log("mongo DB connected")
})


const verifyJwt = require('./routesControler/routes/middlewares/handleauth.js')


const cookieparser = require('cookie-parser')


app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(cookieparser())

app.use('/uploads',verifyJwt,express.static(path.join(process.cwd(),'uploads')))



// managing frontend access
const corsoption = {
    origin: process.env.CORS_ORGIN,
    credentials:true
}

app.use(cors(corsoption))









// managing routes
app.use("/", require('./routesControler/route-controller.js'))







app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`)
})


