import Charts from '@/components/Dashboard/Charts'
import Kpicards from '@/components/Dashboard/Kpicards'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { UserInfoContext } from '@/context/userInfoContext'
import { StockContextProvider } from '@/context/WarehouseInventoryContext'
import { cn } from '@/lib/utils'
import React, { useContext } from 'react'

const Dashboard = () => {
  const { userInfo } = useContext(UserInfoContext)
  return (
    <Layout>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between gap-3 w-full'>
        <div className='flex flex-col items-start justify-start gap-1'>
          <h1 className='text-4xl font-medium text-accent-foreground tracking-tight'>Dashboard</h1>
          <p className='text-xs tracking-tight text-muted-foreground'>Welcome back, {userInfo?.role} — here's your inventory overview</p>
        </div>
        <Button variant={'outline'}>Export report</Button>
      </div>
      <div className='mt-10'>
        <Kpicards />
      </div>
      <div className='mt-5'>
        <StockContextProvider>
          <Charts />
        </StockContextProvider>
        
      </div>
    </Layout>
  )
}

export default Dashboard
