import React, { useContext } from 'react'
import { SidebarProvider } from '../ui/sidebar'
import AppSidebar from './Sidebar'
import InAppNavbar from './InAppNavbar'
import { UserInfoContext } from '@/context/userInfoContext'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {userInfo} = useContext(UserInfoContext)
  const role = userInfo?.role;
  return (
    <SidebarProvider>
      <div className='flex w-full h-screen overflow-hidden'>

        <AppSidebar role={role}/>

        <div className='flex flex-col flex-1 overflow-hidden'>

          <InAppNavbar />

          <main className='flex-1 px-4 mt-20 overflow-y-auto hide-scrollbar'>
            {children}
          </main>

        </div>
      </div>
    </SidebarProvider>
  )
}

export default Layout