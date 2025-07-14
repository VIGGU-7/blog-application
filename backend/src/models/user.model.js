import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    profilePic:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
    },
    userName:{
        type:String,
        required:[true,"Username is required"]
    },
    email:{
        type:String,
         required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    code:{
        type:String,
    },
    forgotPasscode:{
        type:String,
    },
    expiresIn:{
        type:String,
    }
},{timestamps:true})
export const User=mongoose.model("User",userSchema)