import React, { useState } from 'react'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { apiInstance } from '../lib/axios';
import toast from 'react-hot-toast';
function Reset() {
    const navigate=useNavigate()
    const [p1,setp1]=useState("")
    const [p2,setp2]=useState("")
     const [showPassword,setShowPassword]=useState(false)
     const data={
        password:p2
     }
     const token = new URLSearchParams(window.location.search).get("token");
     if(token===null){
        navigate("/login")
     }
     const onSubmit=async()=>{
        if(!p1 || !p2){
            return toast.error("both fields are required")
        }
        if(p1.trim()!==p2.trim()){
            console.log(p1,p2)
            return toast.error("passwords doesn't match")
        }
        try {
            const response=await apiInstance.post(`/auth/forgotpass/${token}`,data)
            navigate("/login")
            return toast.success("password changed sucessfully login with new password")
            
        } catch (error) {
            console.log(error)
             return  toast.error(error?.response?.data?.message || "Something went wrong")
               
        }
     }
  return (

    <div className='bg-white min-h-screen container flex justify-center items-center'>
        <div className='flex flex-col bg-white h-fit p-20 rounded-xl shadow-2xl'>
            <p 
            className=' font-semibold text-gray-800 text-center text-3xl'>
                Change Password</p> 
        <div className='relative'>
                        <input 
                    type={showPassword?"text":"password"}  
                    value={p1}
                    onChange={(e)=>{setp1(e.target.value)}}
                    placeholder='Password' 
                    className='px-4 py-2 rounded-md shadow-2xl w-75 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                      {!showPassword ?  <FaEye onClick={(e)=>setShowPassword(!showPassword)} className='text-gray-600 absolute right-1/35 top-1 bottom-0 mt-auto mb-auto hover:cursor-pointer'/> :
                      <FaEyeSlash  onClick={(e)=>setShowPassword(!showPassword)}className='text-gray-600 absolute right-1/35 top-1 bottom-0 mt-auto mb-auto hover:cursor-pointer'/>
                      }
                    </div> 
         <div className='relative'>
                        <input 
                    type="text" 
                    value={p2}
                    onChange={(e)=>{setp2(e.target.value)}}
                    placeholder='Confirm password' 
                    className='px-4 py-2 rounded-md shadow-2xl w-75 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                    </div> 

            <button 
            onClick={onSubmit}
            className='bg-blue-500 px-3 py-1 text-white rounded-md mt-3 hover:cursor-pointer'>Reset Password</button>
            </div>
            
    </div>
  )
}
export default Reset