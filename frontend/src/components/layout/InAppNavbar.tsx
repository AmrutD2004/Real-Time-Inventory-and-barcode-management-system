import React, { useContext, useState } from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { useTheme } from '../theme-provider'
import { Button } from '../ui/button'
import { Bell, Menu, Moon, Sun, UserIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserInfoContext } from '@/context/userInfoContext'
import Notification from '../Notification/Notification'

const InAppNavbar = () => {
    const { theme, setTheme } = useTheme()
    const { userInfo } = useContext(UserInfoContext)
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className='h-16 border-b min-w-svw fixed top-0 z-50 bg-sidebar'>
            <div className='flex items-center justify-between w-full h-full px-3'>
                <div className='flex items-center justify-center h-full'>
                    <SidebarTrigger />
                </div>
                <div className='flex items-center gap-3 fixed right-6'>
                    <div className='lg:flex md:flex items-center gap-1 hidden'>
                        <Notification />
                        <span className='text-xl scale-80 font-medium px-4 py-2.5 rounded-full border bg-muted-foreground/30 text-accent-foreground'>{userInfo?.email?.[0].toUpperCase()}</span>
                        <div className='flex items-start flex-col'>
                            <span className='text-sm text-accent-foreground text-start font-medium'>{
                                userInfo?.email
                                    ?.split('@')[0]
                                    ?.charAt(0)
                                    ?.toUpperCase() +
                                userInfo?.email
                                    ?.split('@')[0]
                                    ?.slice(1)
                            }</span>
                            <span className='text-xs text-muted-foreground'>{userInfo?.email}</span>
                        </div>
                    </div>
                    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} variant={'outline'} className={cn('px-2 rounded-full')}>{
                        theme === 'dark' ? <Sun /> : <Moon />
                    }</Button>
                    <Button onClick={() => setOpen(!open)} className={cn('rounded-full py-1 px-2 lg:hidden md:hidden')}><Menu /></Button>
                </div>
            </div>
            {open && <div className='lg:hidden md:hidden block w-50 right-0 px-5 py-3 shadow rounded-lg bg-background fixed top-20 border'>

            </div>}
        </div>
    )
}

export default InAppNavbar
