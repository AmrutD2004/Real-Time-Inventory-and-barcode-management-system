import { isAuthenticated, logout } from "@/api/endpoint";
import type { User } from "@/types/user";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

type UserInfoContextType = {
    userInfo: unknown
    isLoggedIn: boolean
    isAuthchecked: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    userLogout : ()=>void
}

export const UserInfoContext = createContext<UserInfoContextType>({
    userInfo: null,
    isLoggedIn: false,
    isAuthchecked: false,
    setIsLoggedIn: () => {},
    userLogout : ()=>{}
})

export const UserInfoContextProvider = ({children} : {children : React.ReactNode })=>{
    const [userInfo, setUserInfo] = useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isAuthchecked, setIsAuthChecked] = useState(false)
    
    const fetchUserinfo = async()=>{
        try {
            const data = await isAuthenticated()
            if(data.success){
                setUserInfo(data?.data)
                setIsLoggedIn(true)
            } else {
                setUserInfo(null)
                setIsLoggedIn(false)
            }
        } catch {
            setUserInfo(null)
            setIsLoggedIn(false)
        } finally {
            setIsAuthChecked(true)
        }
    }

    const userLogout = async ()=>{
        const data = await logout()
        if(data?.success){
            toast.success(data?.message)
            window.location.replace('/login')
            setIsLoggedIn(true)
             setIsAuthChecked(false)
            
        }
    }

    useEffect(()=>{
        fetchUserinfo()
    }, [isLoggedIn])
    return (
        <UserInfoContext.Provider value={{
            setIsLoggedIn, userInfo, isAuthchecked, isLoggedIn, userLogout
        }}>
            {children}
        </UserInfoContext.Provider>
    )
}
