import { UserInfoContext } from '@/context/userInfoContext'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({children} : {children : React.ReactNode}) => {
    const {isLoggedIn, isAuthchecked} = useContext(UserInfoContext)
    if(!isAuthchecked){
        return null
    }
    if(!isLoggedIn){
        return <Navigate to={'/login'} replace/>
    }
  return children
    
  
}

export default Protected
