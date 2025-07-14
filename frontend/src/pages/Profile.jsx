import React, { useState } from 'react';
import { useAuthStore } from '../lib/store';
import { apiInstance } from '../lib/axios';
import toast from 'react-hot-toast';

function Profile() {
  const { authUser, setAuthUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(authUser?.bio || "");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!authUser) {
    return <div className="text-center mt-10 text-gray-600">Loading user profile...</div>;
  }

  // Convert file to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleSave = async () => {
    try {
      setLoading(true);
      let base64Image = null;

      if (imageFile) {
        base64Image = await toBase64(imageFile); // convert to base64 string
      }

      const res = await apiInstance.post("/auth/updateprofile", {
        image: base64Image,
        bio: bio
      });

      setAuthUser(res.data.user); // update Zustand store
      toast.success("Profile updated!");
      setIsEditing(false);
      setPreview(null);
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex items-center space-x-6">
        <img
          src={
            preview
              ? preview
              : authUser.profilePic || "https://via.placeholder.com/100"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm text-gray-600"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{authUser.userName}</h2>
          <p className="text-gray-500">{authUser.email}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">About</h3>
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded-md text-gray-700"
            rows={4}
          />
        ) : (
          <p className="text-gray-600">{authUser.bio || "No bio added yet."}</p>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">{authUser.blogCount ?? 0}</p>
          <p className="text-sm text-gray-500">Posts</p>
        </div>
      </div>

      <div className="mt-6 text-right">
        {isEditing ? (
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
