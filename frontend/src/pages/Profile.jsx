import React from 'react'
import { useAuthStore } from '../lib/store'
function Profile() {
     const {authUser}=useAuthStore()
     console.log(authUser)
  return (
    <div>Profile</div>
  )
}

export default Profile