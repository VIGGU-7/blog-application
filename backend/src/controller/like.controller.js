import mongoose from "mongoose";
import { like } from "../models/likes.model.js";

export const likeOrDislike = async (req, res) => {
  const blogId = req.params.blogId;
  const userId = req.user.id;

  try {
    if (!blogId) {
      return res.status(400).json({
        message: "No blog ID has been specified",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({
        message: "Invalid blog ID",
      });
    }

    const likeExists = await like.findOne({ blogId: blogId, likedBy: userId });

    if (likeExists) {
      await like.findOneAndDelete({ blogId: blogId, likedBy: userId });
      return res.status(200).json({
        message: "Disliked",
      });
    } else {
      const newLike = new like({
        blogId: blogId,
        likedBy: userId,
      });
      await newLike.save();
      return res.status(200).json({
        message: "Liked",
      });
    }
  } catch (error) {
    console.log(error);
    console.log("An error occurred in likeOrDislike controller");
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
