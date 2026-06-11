import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
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
import { addWarehouse } from '@/api/endpoint'
import { toast } from 'sonner'


type porps ={
    onClose : ()=>void
}
type WareHouse = {
    warehouseName : string
    warehouseLocation : string
    warehouseRackInfo : string
}
const AddWarehouseModal = ({onClose} : porps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<WareHouse>({
        warehouseName : '',
        warehouseLocation : '',
        warehouseRackInfo : ''
    })
    const handleChange = (e : React.ChangeEvent <HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name] : value}))
    }
    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true)
        try{
            const payload = {
                warehouseName : formData.warehouseName,
                warehouseLocation : formData.warehouseLocation,
                warehouseRackInfo : formData.warehouseRackInfo
            }
            const data = await addWarehouse(payload)
            if(data?.success){
                toast.success(data.message)
                setFormData({
                    warehouseLocation : '',
                    warehouseName : '',
                    warehouseRackInfo : ''
                })
                setTimeout(()=>{
                    onClose()
                }, 1000)
            }
        }catch(err :any){
            toast.error(err?.response?.data?.message)
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
              <Input onChange={handleChange}
                name="warehouseName"
                placeholder="Enter warehouse name"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Warehouse Location</Label>
              </div>
              <Input onChange={handleChange} name='warehouseLocation' placeholder='Enter warehouse location' required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label>Rack Info (optional)</Label>
              </div>
              <Input onChange={handleChange} name='warehouseRackInfo' placeholder='Enter warehouse rack info' />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        <Button variant={'outline'} onClick={onClose}>
          Cancel
        </Button>
        <Button form='add-warehouse'  disabled={loading} type="submit">
          {loading ? <span className='flex items-center gap-1'><Loader2 />Adding warehouse... </span> : 'Add Warehouse'}
        </Button>
      </CardFooter>
    </Card>
        </div>
    </div>
  )
}

export default AddWarehouseModal
