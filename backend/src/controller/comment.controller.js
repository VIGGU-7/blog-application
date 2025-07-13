import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comments.model.js";
import mongoose from "mongoose";
export const postComment=async(req,res)=>{
    const blogId=req.params.blogId
    const id=req.user.id
    const {comment}=req.body
    try {
        if(!mongoose.Types.ObjectId.isValid(blogId)){
             return res.status(401).json({
                message:"Invalid blog Id"
            })
        }
        if(!blogId){
           return res.status(401).json({
                message:"BlogId is not specified"
            })
        }
        const blogExist=await Blog.findById(blogId)
        if(!blogExist){
            return res.status(404).json({
                message:"Blog not found"
            })
        }
        if(!comment){
            return res.status(400).json({
                message:"Comment is required"
            })
        }
        const newComment=new Comment({
            comment:comment,
            blog:blogId,
            owner:id
        })
        const commentResponse=await newComment.save()
        res.status(201).json(commentResponse)
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
    }
}
//todo:edit comment delete comment