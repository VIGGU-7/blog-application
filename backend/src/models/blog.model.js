import mongoose, { mongo } from 'mongoose'
import { ref } from 'process'
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    image:{
        type:String,
        required:[true,"image is required"]
    },
    content:{
        type:String,
        required:[true,"content is required"]
    },
    Likes:{
        type:String,
        default:0
    },
    tags:{
        type:[String]
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})
export const Blog=mongoose.model("Blog",blogSchema)