import {create} from 'zustand'
import { apiInstance } from './axios'
import toast from 'react-hot-toast'
export const useAuthStore=create((set)=>({
    authUser:null,
    isLoggedIn:false,
    isVerifed:false,
    isLoading:true,
    userVerified:()=>set({isVerifed:true}),
    setAuthUser:(user)=>set({authUser:user}),
    checkSession:async()=>{
        try {
            const response=await apiInstance.get("/auth/checksession")
            const user=response.data
            set({
                authUser:user,
                isVerifed:user.isVerifed,
                isLoggedIn:true,
                isLoading:false
            })
        } catch (error) {
            console.log(error)
            set({
        authUser: null,
        isVerified: false,
        isLoggedIn: false,
        isLoading: false,
      });
        }
    }
}))