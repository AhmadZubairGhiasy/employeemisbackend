
const jwt = require('jsonwebtoken')
require('dotenv').config()




const verifyJwt = (req, res, next) =>{
  const autHeader = req.headers['authorization']

  //if(!autHeader)  return res.sendStatus(401)

    //console.log(autHeader)

    const token = req.cookies['token']

    
    if(!token){
      console.log('token not found')
      res.sendStatus(401)
      console.log(token)
      return
    }

   

    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      (err, denc) => {
        if(err){
          res.sendStatus(403)
          return 
        } 

         
          const data= denc
          
         
          req.body ={
            email: data.username,
            reqdata : req.body
            }


          
          

         
          next()


      }
         
    )
}


module.exports = verifyJwt

