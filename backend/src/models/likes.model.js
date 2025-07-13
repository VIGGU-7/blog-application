import mongoose from 'mongoose'
const likeSchema=new mongoose.Schema({
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true,
    },
    likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
})
export const like=mongoose.model("Like",likeSchema)