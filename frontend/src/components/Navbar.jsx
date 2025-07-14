import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { apiInstance } from '../lib/axios';
import toast from 'react-hot-toast';
function Navbar() {
  const navigate = useNavigate();
    const {isLoggedIn}=useAuthStore()
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-black font-medium underline'
      : 'text-gray-600 hover:text-black ml-4';
  const logout=async()=>{
    try {
      const res=await apiInstance.get("/auth/logout")
      toast.success("logout success")
      navigate("/login")
    } catch(error) {
      toast.error(error?.res?.data?.message)
    }
  }
  return (
    <nav className='w-full shadow-sm bg-white'>
      <div className='container mx-auto flex justify-between items-center py-4 px-6'>
        <ul className='flex space-x-2 text-lg' role="navigation" aria-label="Main navigation">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/create" className={navLinkClass}>Create</NavLink></li>
          <li><NavLink to="/profile" className={navLinkClass}>Profile</NavLink></li>
        </ul>
        <button
          onClick={() => navigate('/login')}
          className={`${isLoggedIn ? "hidden":"block"} bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition`}
        >
          Login
        </button>
         <button
          onClick={logout}
          className={`${!isLoggedIn ? "hidden":"block"} bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition`}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
