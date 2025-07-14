import React, { useState } from 'react';
import { apiInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';

function CreateBlog() {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!authUser) {
    return <div className="text-center mt-10 text-gray-600">Please log in to create a blog post.</div>;
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !imageFile) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      const base64Image = await toBase64(imageFile);

      const res = await apiInstance.post("/blog/create", {
        title,
        content,
        image: base64Image,
      });

      toast.success("Blog created successfully!");
      navigate(`/blog/${res.data.blog._id}`); 
    } catch (err) {
      console.error(err);
      navigate("/")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full border p-2 rounded"
        />

        <div>
          {preview && <img src={preview} alt="preview" className="w-full max-h-60 object-cover rounded mb-2" />}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
