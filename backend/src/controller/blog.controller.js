import { Blog } from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const createBlog = async (req, res) => {
  const userId = req.user.id;
  const { title, content, image } = req.body;

  try {
    if (!title || !content || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!image.startsWith("data:image")) {
      return res.status(400).json({ message: "Invalid image format" });
    }

    const result = await cloudinary.uploader.upload(image);
    const imageUrl = result.secure_url;

    const newBlog = new Blog({
      title,
      image: imageUrl,
      content,
      owner: userId
    });

    const blog = await newBlog.save();
    return res.status(201).json(blog);
  } catch (error) {
    console.error("createBlog Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
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
          from: "likes",
          localField: "_id",
          foreignField: "blogId",
          as: "likes"
        }
      },
      {
        $addFields: {
          likeCount: { $size: "$likes" }
        }
      },
      {
        $project: {
          "ownerDetails.password": 0
        }
      }
    ]);

    return res.status(200).json(blogs);
  } catch (error) {
    console.error("getBlogs Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogsById = async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog ID" });
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
          as: "comments"
        }
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "blogId",
          as: "likes"
        }
      },
      {
        $addFields: {
          likeCount: { $size: "$likes" }
        }
      },
      {
        $unwind: {
          path: "$comments",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.owner",
          foreignField: "_id",
          as: "comments.ownerDetails"
        }
      },
      {
        $unwind: {
          path: "$comments.ownerDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          content: { $first: "$content" },
          image: { $first: "$image" },
          ownerDetails: { $first: "$ownerDetails" },
          likeCount: { $first: "$likeCount" },
          comments: {
            $push: {
              _id: "$comments._id",
              comment: "$comments.comment",
              ownerDetails: {
                _id: "$comments.ownerDetails._id",
                name: "$comments.ownerDetails.name",
                email: "$comments.ownerDetails.email",
                userName:"$comments.ownerDetails.userName",
                image:"$comments.ownerDetails.profilePic"
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

    if (!blog || blog.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog[0]); // Return single blog object
  } catch (error) {
    console.error("getBlogsById Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const blogsByuserId=async(req,res)=>{
  const id=req.user.id
  try {
    const blogsByUser=await Blog.findOne({owner:id})
    if(!blogsByUser){
      return res.status(404).json({
        message:"No Blogs Found associated with user"
      })
    }
    return res.status(200).json(blogsByUser)
  } catch (error) {
    console.log(
      "Issue in blogsByuserId controller"
    )
    return res.status(500).json({
      message:"Internal server error"
    })
  }
}