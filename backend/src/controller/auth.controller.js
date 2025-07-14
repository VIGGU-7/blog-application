import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js"
import { sendEmail } from "../utils/mailer.js"
export const login=async(req,res)=>{
    //checks for req.body
    if(!req.body){
         return res.status(400).json({
                message:"Bad request please send raw data"
            })
    }
    const {email,password}=req.body 
    try {
         if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const user=await User.findOne({email:email})
        if(!user){
             return res.status(401).json({
                message:"Invalid email or password"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
              return res.status(401).json({
                message:"Invalid email or password"
            })
        }
        //generates the token and stores in cookie
        const token=await generateToken(user._id)
        res.cookie("token",
            token,{
                maxAge:7*24*60*60*1000,
                secure:true,
            })
        res.status(200).json({
            success:true,
            message:"Logged in succesfully"
        })
    } catch (error) {
        console.log(error)
        console.log("Issue in login controller")
       return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const signup=async(req,res)=>{
    //for raw data
    if(!req.body){
         return res.status(400).json({
                message:"Bad request please send raw data"
            })
    }
    const {userName,email,password}=req.body
    try {
        //checks for the fields can be managed from frontend
        if(!userName || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const emailExists=await User.findOne({email:email})
        //checks if email exists or not
        if(emailExists){
            return res.status(400).json({
                message:"User with email already exists"
            })
        }
        //checks for username or not
        const userNameExists=await User.findOne({userName:userName})
        if(userNameExists){
             return res.status(400).json({
                message:"Username already exists"
            })
        }
        //checks for password length
        if(password.length<6){
              return res.status(400).json({
                message:"Password should be atleast 6 characters"
            })
        }
        //hashes password with salt 10
        const hashedPass=await bcrypt.hash(password,10)
        const newUser=new User({
            email:email,
            password:hashedPass,
            userName:userName
        })
        //updates the data into db
        await newUser.save()
        const token=await generateToken(newUser._id)
        newUser.code=token;
        newUser.save()

         res.cookie("token",
            token,{
                maxAge:7*24*60*60*1000,
                secure:true,
            })
        sendEmail(newUser.email,token,"verify")
        return res.status(201).json(
            {message:"Registered successfully"}
        )
    } catch (error) {
        console.log("Issue in signup controller")
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const sendResetPassEmail=async(req,res)=>{
    const {email}=req.body;
    try {
        if(!email){
            return res.status(400).json({
                message:"Email is required"
            })
        }
        const user=await User.findOne({email:email})
        if(!user){
             return res.status(400).json({
                message:"No user found with associated email"
            })
        }
        const forgotPasscode=await generateToken(user._id)
        sendEmail(email,forgotPasscode,"RESET")
        user.forgotPasscode=forgotPasscode;
        user.expiresIn=Date.now()+1800000
        await user.save()
        res.status(200).json({
            success:true,
            message:"Email sent successfully"
        })

    } catch (error) {
         console.log("Issue in sendResetEmail controller",error);
        return res.status(500).json({
        message: "Internal server error",
        });
    }
}
export const forgotPassword=async(req,res)=>{
const { code } = req.params;
const { password } = req.body;

try {
  if (!code) {
    return res.status(400).json({
      message: "No code has been specified",
    });
  }
  if(!password){
    return res.status(400).json({
      message: "No password has been specified",
    });
  }

  const user = await User.findOne({forgotPasscode:code});

  if (!user) {
    return res.status(404).json({ message: "Invalid code or user not found" });
  }

  if (user.expiresIn > Date.now()) {
    const hashedPass = await bcrypt.hash(password, 10);
    user.password = hashedPass;
    user.forgotPasscode = undefined;
    user.expiresIn = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User password changed successfully",
    });
  }

  return res.status(400).json({
    success: false,
    message: "Code doesn't match or has expired",
  });
} catch (error) {
  console.log("Issue in forgotPassword controller");
  return res.status(500).json({
    message: "Internal server error",
  });
}
   
}
export const verifyUser=async(req,res)=>{
    const id=req.user.id
    const {code}=req.params
    try {
        if(!code){
            return res.status(400).json({
               message:"No code has been specified"
            })
        }
      const user=await User.findById(id).select("-password")
      if(user.isVerified){
         return res.status(400).json({
            success:false,
            message:"User already verified"
        })
      }
      if(code===user.code){
        return res.status(200).json({
            success:true,
            message:"User verified succesfully"
        })
        user.code=undefined;
        user.isVerified=true;
        user.save()
      }
      return res.status(400).json({
            success:false,
            message:"code doesn't match"
        })
    } catch (error) {
         console.log("Issue in Veify user controller")
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const resendVerifyEmail=async(req,res)=>{
     const id=req.user.id
     const user=await User.findById(id).select("-password")
    try {
         const token=await generateToken(id)
        user.code=token;
        user.save()
        sendEmail(user.email,token,"verify")
          return res.status(200).json({
            success:true,
            message:"Email sent succesfully"
        })
    } catch (error) {
           console.log("Issue in resend Verify mail controller",error)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const checksession=async(req,res)=>{
    const userId=req.user.id;
    try {
        const user=await User.findById(userId).select("-password")
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
    }
}