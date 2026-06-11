import type { Warehous } from '@/types/warehouse'
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'
import { editWarehouse } from '@/api/endpoint'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

type props = {
    warehouse : Warehous,
    onClose : ()=>void
}
const EditWarehouseModal = ({warehouse, onClose} : props) => {
  
   const [loading, setLoading] = useState<boolean>(false)
       const [formData, setFormData] = useState<Warehous | any>({
           warehouseName : warehouse?.warehouseName ? warehouse?.warehouseName : '',
           warehouseLocation :warehouse?.warehouseLocation ? warehouse?.warehouseLocation : '',
           warehouseRackInfo : warehouse?.warehouseRackInfo ? warehouse?.warehouseRackInfo : '',
           warehouseCapacity :  warehouse?.warehouseCapacity ? warehouse?.warehouseCapacity : '',
           warehouseStatus : warehouse?.warehouseStatus ? warehouse?.warehouseStatus : ''
       })
       const handleChange = (e : React.ChangeEvent <HTMLInputElement | HTMLSelectElement>)=>{
           const {name, value} = e.target;
           setFormData((prev : any) => ({...prev, [name] : value}))
       }
       const handleSubmit = async(e: React.FormEvent <HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true)
        try{
          const payload = {
            warehouseName : formData.warehouseName,
           warehouseLocation :formData.warehouseLocation,
           warehouseRackInfo : formData.warehouseRackInfo ,
           warehouseCapacity :  formData.warehouseCapacity ,
           warehouseStatus : formData.warehouseStatus
          }
          const data = await editWarehouse(payload, Number(warehouse?.id))
          if(data?.success){
            toast.success(data?.message)
            window.location.reload();
            setTimeout(()=>{
              onClose()
            }, 2000)
          }
        }catch(err : any){
          toast.error(err?.response?.data?.message)
          setLoading(false)
        }finally{
          setLoading(false)
        }

    }
  return (
    <div className='fixed inset-0 bg-black/30 z-50'>
      <div className='flex items-center justify-center min-h-screen'>
        <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add Warehouse</CardTitle>
        <CardDescription>
          Add Warehouses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id='add-warehouse' onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Warehouse Name</Label>
              <Input  value={formData.warehouseName } onChange={handleChange}
                name="warehouseName"
                placeholder="Enter warehouse name"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Warehouse Location</Label>
              </div>
              <Input value={formData.warehouseLocation } onChange={handleChange} name='warehouseLocation' placeholder='Enter warehouse location' required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Rack Info (optional)</Label>
              </div>
              <Input value={formData.warehouseRackInfo } onChange={handleChange} name='warehouseRackInfo' placeholder='Enter warehouse rack info' />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Warehouse Capacity (optional)</Label>
              </div>
              <Input value={formData.warehouseCapacity} onChange={handleChange} name='warehouseCapacity' placeholder='Enter warehouse rack info' />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Status</Label>
              </div>
              <select value={formData.warehouseStatus} onChange={handleChange} name='warehouseStatus'  className='w-full px-3 py-1.5 border rounded-lg bg-background text-accent-foreground'>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        <Button variant={'outline'} onClick={onClose}>
          Cancel
        </Button>
        <Button form='add-warehouse'  disabled={loading} type="submit">
          {loading ? <span className='flex items-center gap-1'><Loader2 />Saving Changes... </span> : 'Save Change'}
        </Button>
      </CardFooter>
    </Card>
      </div>
    </div>
  )
}

export default EditWarehouseModal
