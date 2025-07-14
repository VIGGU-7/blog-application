import React, { useState } from 'react'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { isValidEmail } from './Login';
import toast from 'react-hot-toast';
import { apiInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
    const navigate=useNavigate()
    const [userName,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [showPassword,setShowPassword]=useState(false)
    const data={
        userName:userName,
        email:email,
        password:password
    }

    const onSubmit=async()=>{
        if(!userName){
            return toast.error("Username is required!")
        }
        if(!email){
            return toast.error("Email is required!")
        }
        if(!isValidEmail(email)){
             return toast.error("Invalid email")
        }
        if(!password){
            return toast.error("Password is required")
        }
        try {
            const response=await apiInstance.post("/auth/signup",data)
            navigate("/")
            return toast.success("Signup succesfull !")
            

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }
  return (
    <div className='bg-white min-h-screen container flex justify-center items-center'>
        <div className='flex flex-col bg-white h-fit p-20 rounded-xl shadow-2xl'>
            <p 
            className=' font-semibold text-gray-800 text-center text-3xl'>
                Signup</p> 
            <input type="email" 
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            placeholder='Username' 
            className='px-4 py-2 rounded-md shadow-2xl border w-75 mt-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
            <input type="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Email' 
            className='px-4 py-2 rounded-md shadow-2xl border w-75 mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
            <div className='relative'>
                <input 
            type={showPassword?"text":"password"}  
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder='Password' 
            className='px-4 py-2 rounded-md shadow-2xl w-75 mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
              {!showPassword ?  <FaEye onClick={(e)=>setShowPassword(!showPassword)} className='text-gray-600 absolute right-1/35 top-1 bottom-0 mt-auto mb-auto hover:cursor-pointer'/> :
              <FaEyeSlash  onClick={(e)=>setShowPassword(!showPassword)}className='text-gray-600 absolute right-1/35 top-1 bottom-0 mt-auto mb-auto hover:cursor-pointer'/>
              }
            </div> 

            <button 
            onClick={onSubmit}
            className='bg-blue-500 px-3 py-1 text-white rounded-md mt-3 hover:cursor-pointer'>Signup</button>
            <p className='text-center'>Already have an account ? <span 
            onClick={()=>{
                window.location.href="/login"
            }}
            className='text-blue-500 text-center hover:cursor-pointer'>Login</span></p>
            </div>
            
    </div>
  )
}
export default Signup