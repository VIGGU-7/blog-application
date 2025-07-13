import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const generateToken=async(id)=>{
try {
    const token=jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    return token;
} catch (error) {
    console.log("Issue occured in generating token")
}
}
