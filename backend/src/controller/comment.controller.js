import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comments.model.js";
import mongoose, { Mongoose } from "mongoose";
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

export const editComment=async(req,res)=>{
    const commentId=req.params.commentId;
    const userId=req.user.id;
    const {newComment}=req.body;
    try {
        if(!commentId){
           return res.status(400).json({
                message:"No comment id has been provided"
            })
        }
        if(!mongoose.Types.ObjectId.isValid(commentId)){
              return res.status(400).json({
                message:"Invalid comment id"
            })
        }
        const comment=await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({
                message:"No comment has been found"
            })
        }
        if(!newComment){
            return res.status(400).json({
                message:"New comment is required"
            })
        }
        if(userId!==comment.owner.toString()){
            return res.status(401).json({
                message:"Unauthorized for editing comment"
            })
        }
            comment.comment=newComment;
            const updatedComment=await comment.save()
            res.status(201).json(updatedComment)
    } catch (error) {
        console.log("An error occured in edit comment controller")
        res.status(500).json({
            message:"Internal server error"
        }
        )
    }
}

export const deleteComment=async(req,res)=>{
     const commentId=req.params.commentId;
    const userId=req.user.id;
    try {
        if(!commentId){
           return res.status(400).json({
                message:"No comment id has been provided"
            })
        }
        if(!mongoose.Types.ObjectId.isValid(commentId)){
              return res.status(400).json({
                message:"Invalid comment id"
            })
        }
        const comment=await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({
                message:"No comment has been found"
            })
        }
         if(userId!==comment.owner.toString()){
            return res.status(401).json({
                message:"Unauthorized for deleting comment"
            })
        }
        await Comment.findByIdAndDelete(commentId)
         return res.status(200).json({
                message:"Comment deleted successfully"
            })
    } catch (error) {
        console.log("An error occured in delete comment controller")
        res.status(500).json({
            message:"Internal server error"
        }
        )
    }
}