import mongoose, { Mongoose } from "mongoose";
import { like } from "../models/likes.model.js";

export const likeOrDislike=async(req,res)=>{
    const blogId=req.params.blogId;
    const userId=req.user.id
    try {
        if(!blogId){
            res.status(400).json({
                message:"No blogid has been specified"
            })
        }
        if(!mongoose.Types.ObjectId.isValid(blogId)){
            res.status(400).json({
                message:"Invalid blog Id"
            })
        }
        const likeExists=await like.findOne({blogId:blogId,likedBy:userId})
        if(likeExists){
            await like.findOneAndDelete({blogId:blogId,likedBy:userId})
            res.status(200).json({
                message:"disliked"
            })
        }
        const newLike=new like({
            blogId:blogId,
            likedBy:userId
        })
        await newLike.save()
        res.status(200).json({
            message:"liked"
        })
    } catch (error) {
        console.log(error)
          console.log("An error occured in likeOrDislike controller")
        res.status(500).json({
            message:"Internal server error"
        }
    )
    }
}