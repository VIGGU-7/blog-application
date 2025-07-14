import React from 'react';
import { useAuthStore } from '../lib/store';
import { MdEdit, MdDelete } from "react-icons/md";
import { apiInstance } from '../lib/axios';
import toast from 'react-hot-toast';

function Viewcomments({ comment, userName, userAvatar, commentId, ownerId }) {
  const { authUser, setCommentPosted } = useAuthStore();
  const isOwner = authUser?._id === ownerId;

  const onDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await apiInstance.delete(`/comment/delete/${commentId}`);
      setCommentPosted();
      toast.success("Comment deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete comment");
    }
  };
  const onEdit=async()=>{
    try{

    }
    catch(error){
       toast.error(error?.response?.data?.message || "Failed to edit comment");
    }
  }
  if(userAvatar || userName)
  {return (
    <div className="bg-white shadow-md mt-2 mb-1 p-2">
      <div className="flex items-center">
        <img
          src={userAvatar}
          alt={`${userName}'s avatar`}
          className="rounded-full w-10 h-10 object-cover mr-3"
        />
        <p className="text-md font-semibold text-gray-700">{userName}</p>
        {isOwner && (
          <>
            <MdDelete onClick={onDelete} className="hover:cursor-pointer" />
          </>
        )}
      </div>
      <p className="mt-2 text-md">{comment}</p>
    </div>
  );
}}

export default Viewcomments;
