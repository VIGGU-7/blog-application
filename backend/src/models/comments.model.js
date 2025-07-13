import mongoose from 'mongoose'
const commentSchema=new mongoose.Schema({
    comment:{
        type:string,
        required:[true,"Title is required"]
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
export const Blog=mongoose.model("Blog",blogSchema)