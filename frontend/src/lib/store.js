import { create } from 'zustand';
import { apiInstance } from './axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggedIn: false,
  isVerified: false,
  isLoading: true,
  commentPosted: false,

  userVerified: () => set({ isVerified: true }),
  setAuthUser: (user) => set({ authUser: user }),
  setCommentPosted: () => set({ commentPosted: !get().commentPosted }),

  checkSession: async () => {
    try {
      const response = await apiInstance.get("/auth/checksession");
      const user = response.data;
      set({
        authUser: user,
        isVerified: user.isVerified,
        isLoggedIn: true,
        isLoading: false
      });
    } catch (error) {
      console.log(error);
      set({
        authUser: null,
        isVerified: false,
        isLoggedIn: false,
        isLoading: false
      });
    }
  }
}));
