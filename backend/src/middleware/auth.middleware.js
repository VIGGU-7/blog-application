import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const checkAuth=async(req,res,next)=>{
try {
  
    const {token}=req.cookies
    if(!token){
         return res.status(401).json({
            message:"Unauthorized"
        })
    }
    const decoded=jwt.decode(token,process.env.JWT_SECRET)
    const userExist=await User.findById(decoded.id)
    if(!userExist){
         return res.status(401).json({
            message:"Unauthorized"
        })
    }
    req.user=decoded;
    next()
} catch (error) {
       console.log("Issue in checkAuth middleware")
        return res.status(500).json({
            message:"Internal server error"
        })
}
}