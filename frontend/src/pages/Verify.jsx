import React, { useEffect, useState } from 'react';
import { apiInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../lib/store';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Verify() {
  const { userVerified } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const token = new URLSearchParams(window.location.search).get("token");

  const isVerifying = async () => {
    try {
      const response = await apiInstance.post(`/auth/verify/${token}`);
      toast.success("User verified successfully");
      userVerified(); 
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isVerifying(); 
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white flex justify-center items-center min-h-screen">
        <Loader className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="bg-white flex justify-center items-center min-h-screen flex-col gap-4">
      <h2 className="text-xl font-semibold">Email Verified ✅</h2>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Back to Homepage
      </button>
    </div>
  );
}

export default Verify;
