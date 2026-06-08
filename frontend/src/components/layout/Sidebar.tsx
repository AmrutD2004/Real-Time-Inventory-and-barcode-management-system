import React, { useContext } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import darklogo from '@/images/Logo.png'
import whitelogo from '@/images/WhiteLogo.png'
import { ChartBarStacked, LayoutDashboard, LogOut, PackageSearch, ScanBarcode, Settings, Users, Warehouse } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { UserInfoContext } from '@/context/userInfoContext'
import { useTheme } from 'next-themes'

const AppSidebar = ({ role }: { role: string }) => {
  const { theme } = useTheme()
  const menuGroups = [
    {
      title: 'Main',
      items: [
        {
          link: 'Dashboard',
          path: '/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Product Management',
      items: [
        {
          link: 'Categories',
          path: '/categories',
          icon: ChartBarStacked,
        },
        {
          link: 'Products',
          path: '/products',
          icon: PackageSearch,
        },
        {
          link: 'Warehouse',
          path: '/warehouse',
          icon: Warehouse,
        },
        ...(role === 'Operator' || 'Admin'
          ? [
            {
              link: 'Scan',
              path: '/scan',
              icon: ScanBarcode,
            },
          ]
          : []),

      ],
    },
    // {
    //   title: 'Settings',
    //   items: [
    //     {
    //       link: 'Settings',
    //       path: '/admin/settings',
    //       icon: Settings,
    //     },
    //   ],
    // },
  ]
  const pathname = window.location.pathname
  const { userLogout } = useContext(UserInfoContext)
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='border-b group-data-[collapsible=icon]:hidden'>
        <div className='w-full flex items-center justify-center gap-2'>
          <img src={theme === 'dark' ? whitelogo : darklogo} alt='Logo' width={49} />
          <h1 className='text-lg font-semibold tracking-tight'>Scanventory</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className='group-data-[collapsible=icon]:mt-15'>
        {menuGroups.map((group, idx) => (
          <SidebarGroup key={idx}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <SidebarMenuItem key={index} >
                      <SidebarMenuButton className='mt-1 text-sm'
                        isActive={pathname === item.path}
                        tooltip={item.link}
                      >
                        <Link
                          to={item.path}
                          className="flex items-center gap-3"
                        >
                          <Icon size={18} />
                          <span>{item.link}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={userLogout} variant={'destructive'} className={cn('flex items-center')}><LogOut />Logout</Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
