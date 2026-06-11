import type { Categories } from '@/types/categories'
import type { Warehous } from '@/types/warehouse'
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
import { addStock } from '@/api/endpoint'
import { toast } from 'sonner'

type props = {
  warehouse: Warehous,
  categories: Categories
  onClose: () => void,
  products: any
  onStockAdded : ()=>void
}
const AddStock = ({ warehouse, onClose, products,onStockAdded }: props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<any>({
    product_id: '',
    quantity: '',
    low_stock_threshold: '10'
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev : any) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      const payload = {
        warehouse_id: Number(warehouse?.id),
        product_id: Number(formData.product_id),
        quantity: Number(formData.quantity),
        low_stock_threshold: Number(formData.low_stock_threshold)
      }
      const data = await addStock(payload)
      if (data?.success) {
        toast.success(data?.message)
        setFormData({
          product_id: '',
          quantity: '',
          low_stock_threshold: '10'
        })
         onStockAdded()
        setTimeout(() => {
          onClose();
        }, 2000)
      }
    } catch (err: any) {
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
            <CardTitle>Assign stock to warehouse</CardTitle>
            <CardDescription>
              {warehouse?.warehouseName}— WH-00{warehouse?.id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id='add-warehouse' onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Select product *</Label>
                  <select onChange={handleChange}
                    name="product_id"
                    required
                    className='bg-background px-5 py-1.5 rounded-lg border outline-none'
                  >
                    <option value="">choose a product</option>
                    {products.map((items: any) => (
                      <option key={items.id} value={items.id}>{items?.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label>Initial quantity *</Label>
                  </div>
                  <Input onChange={handleChange} name='quantity' placeholder='eg., 100' required value={formData.quantity} />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label>Low Stock Threshold</Label>
                  </div>
                  <Input value={formData.low_stock_threshold} onChange={handleChange} name='low_stock_threshold' placeholder='Enter warehouse rack info' />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-2">
            <Button variant={'outline'} onClick={onClose}>
              Cancel
            </Button>
            <Button form='add-warehouse' disabled={loading} type="submit">
              {loading ? <span className='flex items-center gap-1'><Loader2 />Assigning stock </span> : 'Assign Stock'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default AddStock
