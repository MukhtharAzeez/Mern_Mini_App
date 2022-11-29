const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken : async (req,res,next)=>{
        // let authHeader = req.headers.authorization
        // console.log(authHeader)
        // if(authHeader == undefined){
        //     res.status(400).send({error : 'no token provided'})
        // }

            let token = req.session.token
            console.log(token)
            if(token){
                jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                    if(err){
                        res.status(500).send(err)
                    }
                    if(decoded){
                        next()
                    }
                })
            }else{
                res.status(400).send({error : 'no token provided'})
            }        
    }
}