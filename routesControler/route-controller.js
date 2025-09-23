const express = require('express')
const Router = express.Router()



const verifyJwt = require('./routes/middlewares/handleauth.js')







Router.use(express.json())


// get all user router handling
Router.use("/getalluser",verifyJwt, require("./routes/userpersonaldata/userRoute.js"))


// home page route handling
Router.use("/", require("./routes/homeRoute.js"))




// login and logout and register routes
Router.use("/register", require("./routes/auth-routes-login/registerRoute.js"))
Router.use("/login" ,  require("./routes/auth-routes-login/loginRoute.js"))
Router.use("/logout", verifyJwt,require("./routes/auth-routes-login/logout.js"))





// users routes
Router.use("/deletuser",verifyJwt, require("./routes/userrout/deleteuser.js"))
Router.use("/updateuser",verifyJwt, require("./routes/userrout/updateuser.js"))
Router.use("/updateadminuser",verifyJwt, require("./routes/userrout/useradminupdate.js"))
Router.use("/updatepassword",verifyJwt, require("./routes/userrout/updatepassword.js"))


// get report
Router.use("/getuserreport",verifyJwt, require("./routes/employeeperformance.js"))
Router.use("/getuserreportbyadmin",verifyJwt, require("./routes/employeeperformance-admin.js"))



//pending user routes

Router.use("/getpendinguser",verifyJwt, require("./routes/userrout/getpendinguser.js"))
Router.use("/decidependinguser",verifyJwt, require("./routes/userrout/giveuserpermission.js"))

// projects routes

Router.use("/addproject",verifyJwt, require("./routes/projectsroutes/addproject.js"))
Router.use("/updateproject",verifyJwt, require("./routes/projectsroutes/updateproject.js"))
Router.use("/getproject",verifyJwt, require("./routes/projectsroutes/getuserprojects.js"))
Router.use("/getallproject",verifyJwt, require("./routes/projectsroutes/getallproject.js"))
Router.use("/deleteproject",verifyJwt, require("./routes/projectsroutes/deleteproject.js"))



// attend routes
Router.use("/addattend",verifyJwt, require("./routes/attendroutes/addattend.js"))
Router.use("/getuserattends",verifyJwt, require("./routes/attendroutes/getSingleattends.js"))
Router.use("/getallattends",verifyJwt, require("./routes/attendroutes/getAllattends.js"))
Router.use("/updateattends",verifyJwt, require("./routes/attendroutes/updateattendbyid.js"))

// profile photo route
Router.use("/upload",verifyJwt, require("./routes/filesaveRoute.js"))




// user personal info and data routes
Router.use("/profile", require("./routes/userpersonaldata/userprofile.js"))
Router.use("/getallusers", verifyJwt, require("./routes/userpersonaldata/getallusers.js"))







module.exports = Router 