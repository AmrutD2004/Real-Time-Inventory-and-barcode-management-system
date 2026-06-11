import { getDashboardstats } from '@/api/endpoint'
import { AlertCircle, Box, Layers, Warehouse } from 'lucide-react'
import { useEffect, useState } from 'react'

type Stats = {
    totalProduct: number
    totalWarehouse: number
    lowStockItems: number
    TotalStockUnits: {
        _sum: {
            quantity: number
        }
    }
}
const Kpicards = () => {

    const [dashboardStats, setDashboardStats] = useState<Stats | null>(null)
    const fetchDashboardStats = async()=>{
        const data = await getDashboardstats()
        if(data?.success){
            setDashboardStats(data?.data)
        }
    }
    useEffect(()=>{
        fetchDashboardStats()
    }, [])
    if (!dashboardStats) {
    return null
}
    const kpicard = [
        {
            title: 'Total Products',
            icon: <Box size={20} />,
            number: dashboardStats?.totalProduct
        },
        {
            title: 'Total Warehouses',
            icon: <Warehouse size={20} />,
            number: dashboardStats?.totalWarehouse  
        },
        {
            title: 'Low Stock Items',
            icon: <AlertCircle size={20} />,
            number: dashboardStats?.lowStockItems
        },
        {
            title: 'Total Stock Units',
            icon: <Layers size={20} />,
            number: dashboardStats?.TotalStockUnits?._sum?.quantity
        },
    ]

    if (!dashboardStats) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
                <div
                    key={i}
                    className="h-28 rounded-xl border animate-pulse"
                />
            ))}
        </div>
    )
}
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {kpicard.map((item, idx) => (
                <div
                    key={idx}
                    className='border rounded-xl shadow-sm px-5 py-4 bg-background hover:shadow-md transition-all'
                >
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs uppercase tracking-wide text-muted-foreground font-medium'>
                                {item.title}
                            </span>

                            <h1 className='text-3xl font-bold tracking-tight text-accent-foreground'>
                                {item.number}
                            </h1>
                        </div>

                        <div className='p-3 rounded-xl bg-muted text-muted-foreground'>
                            {item.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Kpicards