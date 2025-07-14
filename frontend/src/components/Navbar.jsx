import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { apiInstance } from '../lib/axios';
import toast from 'react-hot-toast';

function Navbar() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const loadUser = async () => {
      try {

        if (!authUser) {
          const res = await apiInstance.get("/auth/checksession"); 
          setAuthUser(res.data.user);
        }
      } catch (err) {
        setAuthUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const isLoggedIn = !!authUser;

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-black font-medium underline'
      : 'text-gray-600 hover:text-black ml-4';

  const logout = async () => {
    try {
      await apiInstance.get("/auth/logout");
      toast.success("Logout successful");
      setAuthUser(null);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  // 🌀 Loading State UI
  if (isLoading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <nav className='w-full shadow-sm bg-white'>
      <div className='container mx-auto flex justify-between items-center py-4 px-6'>
        <ul className='flex space-x-2 text-lg'>
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          {isLoggedIn && (
            <>
              <li><NavLink to="/create" className={navLinkClass}>Create</NavLink></li>
              <li><NavLink to="/profile" className={navLinkClass}>Profile</NavLink></li>
            </>
          )}
        </ul>

        <div className="flex gap-2">
          {!isLoggedIn ? (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
