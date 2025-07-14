import React from 'react'
import { IoMdSend } from "react-icons/io";
import { apiInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../lib/store';

function Comment({ blogId }) {
    const {commentPosted,setCommentPosted}=useAuthStore()
  const [comment, setComment] = React.useState("");

  const onSubmit = async () => {
    if (!comment.trim()) {
      return toast.error("Comment is required");
    }
    try {
      const res = await apiInstance.post(`/comment/post/${blogId}`, { comment });
      toast.success("Comment posted successfully");
      setComment(""); 
      console.log(res);
      setCommentPosted()
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='mt-30 relative'>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Comment'
        className='p-2 rounded-md w-full bg-gray-200'
      />
      <IoMdSend
        onClick={onSubmit}
        className='absolute top-1/4 right-2 text-xl text-gray-700 hover:cursor-pointer'
      />
    </div>
  );
}

export default Comment;
