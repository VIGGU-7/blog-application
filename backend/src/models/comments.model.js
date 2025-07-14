import mongoose from 'mongoose'
const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:[true,"Comment is required"]
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
})
export const Comment=mongoose.model("Comment",commentSchema)