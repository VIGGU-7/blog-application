import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { apiInstance } from '../lib/axios';
function Forgot() {
    const [email,setEmail]=useState("")

    const onSubmit=async()=>{
        if(!email){
            return toast.error("Email is required!")
        }
        if(!isValidEmail(email)){
             return toast.error("Invalid email")
        }
        try {
          const response=apiInstance.post("/auth/sendforgotcode",{email:email})
          return toast.success("Email sent succesfully")
        } catch (error) {
           return toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }
  return (
    <div className='bg-white min-h-screen container flex justify-center items-center'>
        <div className='flex flex-col bg-white h-fit p-20 rounded-xl shadow-2xl'>
            <p 
            className=' font-semibold text-gray-800 text-center text-3xl'>
                Forgot Password</p> 
            <input type="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Email' 
            className='px-4 py-2 rounded-md shadow-2xl border w-75 mt-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'/>

            <button 
            onClick={onSubmit}
            className='bg-blue-500 px-3 py-1 text-white rounded-md mt-3 hover:cursor-pointer'>Reset Password</button>
            <p className='text-center'>Don't have an account ? <span 
            onClick={()=>{
                window.location.href="/signup"
            }}
            className='text-blue-500 text-center hover:cursor-pointer'>register</span></p>
            </div>
            
    </div>
  )
}
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
export default Forgot