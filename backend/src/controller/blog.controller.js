import { Blog } from "../models/blog.model.js";
import  cloudinary  from "../utils/cloudinary.js";
import mongoose from "mongoose";
export const createBlog=async(req,res)=>{
    const userId=req.user.id
    const {title,content,image}=req.body
    try {
        if(!id){
            return res.status(401).json({
                message:"You need to be logged in to post a blog"
            })
        }
        if(!title || !content || !image){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        
        const result=await cloudinary.uploader.upload(image)
        const imageUrl=result.secure_url;
        const newBlog=new Blog({
            title:title,
            image:imageUrl,
            content:content,
            owner:userId
        })
        const blog=await newBlog.save()
        return res.status(201).json(blog)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const getBlogs=async(req,res)=>{
    try{
        const blogs=await Blog.aggregate([{$lookup:{
            from:"users",
            localField:'owner',
            foreignField:'_id',
            as:"ownerDetails"
        }},{
            $unwind:"$ownerDetails"
        },{
            $project:{
                "ownerDetails.password":0
            }
        }])
        res.status(200).json(blogs)
    }catch(error){
        console.log(error)
        console.log("An error occured in get blog controller")
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const getBlogsById=async(req,res)=>{
    const id=req.params.id
    console.log(id)
    try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid blog ID" });
         }
        const blog = await Blog.aggregate([
  {
    $match: { _id: new mongoose.Types.ObjectId(id) }
  },
  {
    $lookup: {
      from: "users",
      localField: "owner",
      foreignField: "_id",
      as: "ownerDetails"
    }
  },
  {
    $unwind: "$ownerDetails"
  },
  {
    $lookup: {
      from: "comments",
      localField: "_id",
      foreignField: "blog",
      as: "Comments"
    }
  },
  {
    $unwind: {
      path: "$Comments",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "Comments.owner",
      foreignField: "_id",
      as: "Comments.ownerDetails"
    }
  },
  {
    $unwind: {
      path: "$Comments.ownerDetails",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $group: {
      _id: "$_id",
      title: { $first: "$title" },
      content: { $first: "$content" },
      ownerDetails: { $first: "$ownerDetails" },
      Comments: {
        $push: {
          _id: "$Comments._id",
          comment: "$Comments.comment",
          ownerDetails: {
            _id: "$Comments.ownerDetails._id",
            name: "$Comments.ownerDetails.name",
            email: "$Comments.ownerDetails.email"
          }
        }
      }
    }
  },
  {
    $project: {
      "ownerDetails.password": 0
    }
  }
]);

        if(!blog){
              return res.status(404).json({
                message:"Blog not found"
            })
        }
        return res.status(200).json(blog)
    } catch (error) {
        console.log(error)
         return res.status(500).json({
            message:"Internal server error"
        })
    }
}