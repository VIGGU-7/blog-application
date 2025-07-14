import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Forgot from './pages/Forgot'
import { useAuthStore } from './lib/store'
import Profile from './pages/Profile'
import Verify from './pages/Verify'
import Homepage from './pages/Homepage'
import { Loader } from 'lucide-react'
import Reset from './pages/Reset'
import Blogview from './pages/Blogview'
import CreateBlog from './pages/Createblogs'
function App() {
   const { checkSession, isLoggedIn, isVerified, isLoading } = useAuthStore()

    useEffect(() => {
    checkSession()
  }, [])


    if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    )
  }
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />

      <Route
        path="/verify"
        element={
          isLoggedIn ? <Verify /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/profile"
        element={
          isLoggedIn && !isVerified? <Profile /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/" /> : <Login />
        }
      />

      <Route
        path="/signup"
        element={
          isLoggedIn ? <Navigate to="/" /> : <Signup />
        }
      />

      <Route
        path="/forgotpassword"
        element={
          isLoggedIn ? <Navigate to="/" /> : <Forgot />
        }
      />
      <Route
        path="/reset"
        element={
          <Reset/>
        }
      />
        <Route
        path="/blog/:id"
        element={
          <Blogview/>
        }
      />
      <Route
      path='/create'
      element={
      <CreateBlog/>
      }
      />
    </Routes>
  )
}

export default App
