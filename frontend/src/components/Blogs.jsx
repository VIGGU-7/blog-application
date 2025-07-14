import React, { useEffect, useState } from 'react';
import { apiInstance } from '../lib/axios';
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function Blogs() {
    const Navigate=useNavigate()
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await apiInstance.get("/blog/");
        setBlogs(response.data || []);
        console.log(response)
      } catch (err) {
        setError("Failed to load blogs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  if (loading) return <p className='text-center mt-10'>Loading blogs...</p>;
  if (error) return <p className='text-center text-red-500 mt-10'>{error}</p>;

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8'>
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className='w-full max-w-md mx-auto p-4 rounded-xl shadow-sm hover:cursor-pointer hover:shadow-md transition'
        onClick={()=>{Navigate(`/blog/${blog._id}`)}}>
          <img
            className='rounded-md w-full h-48 object-cover mb-3'
            src={blog.image }
            alt={blog.title}
          />
          <p className='text-xl font-semibold text-gray-800 line-clamp-2'>
            {blog.title}
          </p>
          <div className='flex items-center mt-3'>
            <img
              className='rounded-full w-10 h-10 object-cover'
              src={blog.ownerDetails.profilePic }
              alt={blog.ownerDetails.userName || "Unknown"}
            />
            <p className='ml-3 text-gray-700 font-medium'>
              {blog.ownerDetails.userName || "Unknown Author"}
            </p>
            <FaHeart className='text-gray-600 ml-auto' />
            <p className='ml-1'>{blog.likeCount}</p>
          </div>
          <p className='ml-13'>
            {blog.ownerDetails.Bio}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Blogs;
