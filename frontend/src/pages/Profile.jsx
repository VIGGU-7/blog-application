import React from 'react';
import { useAuthStore } from '../lib/store';

function Profile() {
  const { authUser } = useAuthStore();
  
  if (!authUser) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading user profile...
      </div>
    );
  }
  console.log(authUser)

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex items-center space-x-6">
        <img
          src={authUser.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{authUser.userName || 'Unnamed User'}</h2>
          <p className="text-gray-500">{authUser.email || 'Email not available'}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">About</h3>
        <p className="text-gray-600">
          {authUser.Bio || "No bio added yet."}
        </p>
      </div>

      <div className="mt-6 flex gap-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">{authUser.postsCount ?? 0}</p>
          <p className="text-sm text-gray-500">Posts</p>
        </div>
        </div>
      <div className="mt-6 text-right">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
