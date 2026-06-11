import WarehousesGrid from '@/components/Grids/WarehousesGrid'
import Layout from '@/components/layout/Layout'
import AddWarehouseModal from '@/components/modals/WarehouseModals/AddWarehouseModal'
import { Button } from '@/components/ui/button'
import { WareHouseContext } from '@/context/WarehouseInventoryContext'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { useContext, useState } from 'react'

const WareHouse = () => {
    const [open, setOpen] = useState<boolean>(false)
    const {warehouses} = useContext(WareHouseContext)
  return (
    <>
     <Layout>
        <div className='flex flex-col md:flex-row lg:flex-row lg:items-center md:items-center lg:justify-between md:justify-between w-full gap-3'>
            <div className='flex flex-col items-start justify-start gap-1'>
            <h1 className='text-4xl tracking-tight font-medium text-accent-foreground'>Warehouses</h1>
            <p className='text-xs text-muted-foreground'>Manage all warehouse locations and stock</p>
        </div>  
        <Button onClick={() => setOpen(true)} className={cn('flex items-center gap-1 sm:w-50 ')}><Plus />Add Warehouse</Button>
        </div> 
        <WarehousesGrid warehouses={warehouses}/>
    </Layout> 
    {open && <AddWarehouseModal onClose={() => setOpen(false)}/>}
    </>
  )
}

export default WareHouse
