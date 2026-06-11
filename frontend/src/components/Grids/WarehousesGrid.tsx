import type { Warehous } from '@/types/warehouse'
import React from 'react'
import { Badge } from '../ui/badge'
import { LocationEditIcon, Map, MapPin, Warehouse } from 'lucide-react'
import { encodeId } from '@/utils/IdEncrypter'
import { useNavigate } from 'react-router-dom'

type props = {
    warehouses: Warehous[]
}
const WarehousesGrid = ({ warehouses }: props) => {
    const navigate = useNavigate()
    const handleId = async(warehouseid : number)=>{
        const id = await encodeId(warehouseid)
        navigate(`/warehouse/${id}`)
    }
    return (
        <div className='grid grid-cols-1 gap-1 w-full mt-10'>
            {warehouses.map((items: Warehous, idx: number) => (
                <div className='w-full border rounded-lg shadow flex items-start justify-between px-5 py-3 hover:bg-muted-foreground/10 transition-colors duration-200 cursor-pointer' onClick={() => handleId(items.id)}>
                    <div className='flex flex-col items-start justify-start gap-1'>
                        <Badge variant={'outline'} className='px-2 py-3 rounded-md shadow'><Warehouse size={20} /></Badge>
                        <span className='text-xs text-muted-foreground font-mono'>WH-00{idx + 1}</span>
                        <h1 className='tracking-tight font-medium text-lg'>{items?.warehouseName}</h1>
                        <span className='flex items-center gap-1 text-xs text-muted-foreground'><MapPin size={16}/>{items.warehouseLocation}</span>
                    </div>
                    <Badge variant={items?.warehouseStatus === 'Inactive' ? 'destructive' : 'default'}>{items?.warehouseStatus}</Badge>
                </div>
            ))}
        </div>
    )
}

export default WarehousesGrid
