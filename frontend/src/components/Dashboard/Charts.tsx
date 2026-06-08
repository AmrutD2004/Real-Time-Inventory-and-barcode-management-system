import React from 'react'
import BarChart from './BarChart'
import LineChart from './LineChart'

const Charts = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='border rounded-lg shadow px-5 py-3'>
            <div className='flex items-center justify-between w-full'>
                <div className='flex flex-col items-start justify-start gap-1'>
                <h1 className='text-sm tracking-tight text-muted-foreground font-medium'>Stock movement — last 7 days</h1>
                <p className='text-xs tracking-tight text-muted-foreground font-medium'>IN vs OUT movements</p>
            </div>
            <div className='flex items-center justify-center gap-2 text-sm'>
                <h1 className='flex items-center gap-1 text-green-500'><span className='p-2 scale-80 rounded-sm  bg-green-500'></span>IN</h1>
                <h1 className='flex items-center gap-1 text-red-500'><span className='p-2 scale-80 rounded-sm  bg-red-500'></span>OUT</h1>
            </div>
            </div>
           <LineChart />
        </div>
        <div className='border rounded-lg shadow px-5 py-3'>
            <div className='flex flex-col items-start justify-start gap-1'>
                <h1 className='text-sm tracking-tight text-muted-foreground font-medium'>Stock per warehouse</h1>
                <p className='text-xs tracking-tight text-muted-foreground font-medium'>Total units stored</p>
            </div>
             <BarChart />
        </div>
    </div>
  )
}

export default Charts
