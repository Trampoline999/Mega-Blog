import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../store/auth.js'

export const LogoutBtn = () => {
    const dispatch =useDispatch()
    
    function handleClick(){
        authService.logout()
        .then(()=>dispatch(logout()))
    }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={handleClick}>LogoutBtn</button>
  )
}
