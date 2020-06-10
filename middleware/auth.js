
const Admin = require('../models/admin')
const jwt=require('jsonwebtoken')
const auth =async (req,res,next)=>{
    try{
        console.log(req.body.header)
        const token = req.header('Authorization').replace('Bearer ', '')
        if(!token)
        {
            throw new Error()
        }
        const decoded = await jwt.verify(token, `SECRET_KEY`)
        const user = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
        if(!user)
        {
            throw new Error()
        }
        req.user=user
        req.token=token
        next()
    }
    catch(e){
        res.status(401).send({ error: "Authentication Failed ! Please sign in again." })
    }
       
}
module.exports= auth