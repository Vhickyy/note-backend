const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const auth = async (req,res,next)=>{
    const auth = req.headers.authorization
    // console.log("here");
    if(!auth || !auth.startsWith('Bearer ')){
        throw new Error(' Unauthenticated')
    }else{
        let token = auth.split(' ')[1]
        try {
           const decoded =  jwt.verify(token,process.env.JWT_SECRET)
           req.user = {userId:decoded.userId}
           next() 
        } catch (error) {
            res.status(403)
            throw new Error('Unauthenticated')
        }
        
    }
}
module.exports = auth