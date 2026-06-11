import React, { useContext, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '../../ui/button'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Loader2 } from 'lucide-react'
import { editProduct } from '@/api/endpoint'
import { toast } from 'sonner'
import { ProductContext } from '@/context/ProductContext'

import { cn } from '@/lib/utils'
type Product = {
  id: string | number
  name: string
  sku: string
  barcode: string
  price: string
  created_at: Date
  updated_at: Date
  category_id: number
}

type porps = {
  onClose: () => void
  selectedProduct : Product | any
}
const EditProductModal = ({ onClose, selectedProduct }: porps) => {
  const { categories, fetchProducts, skip, take } = useContext(ProductContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    productname: selectedProduct?.name ||'',
    price: selectedProduct?.price ||'',
    category_id: selectedProduct?.category_id ||'',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try{
      const payload ={
        name : formData.productname,
        price : formData.price,
        category_id : formData.category_id,
      }
      const data = await editProduct(payload, Number(selectedProduct.id))
      if(data?.success){
        toast.success(data?.message)
      setTimeout(()=>{
        onClose()
      }, 1000)
      fetchProducts(skip, take)
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
        <Card className="md:w-120 lg:w-150 mx-2">
          <CardHeader>
            <CardTitle>Edit Product ({selectedProduct?.name})</CardTitle>
            <CardDescription>
              Edit products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id='product-form' onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label className='lg:text-sm text-xs'>Product Name</Label>
                  <Input
                    value={formData.productname}
                    onChange={handleChange}
                    name="productname"
                    type="text"
                    placeholder="Enter product"
                    required
                    className='text-xs  md:text-xs placeholder:text-xs lg:text-sm lg:placeholder:text-sm'
                  />
                </div>
                <div className="grid gap-2">
                  <Label className='lg:text-sm text-xs'>Price</Label>
                  <Input
                    value={formData.price}
                    onChange={handleChange}
                    name="price"
                    type="text"
                    placeholder="Enter price"
                    required
                    className='text-xs  md:text-xs placeholder:text-xs lg:text-sm lg:placeholder:text-sm'
                  />
                </div>
                <div className="grid gap-2">
                  <Label className='lg:text-sm text-xs'>Category</Label>
                  <select
                    onChange={handleChange}
                    required
                    name="category_id"
                    value={formData.category_id}
                    className="
    w-full rounded-lg text-xs  md:text-xs lg:text-sm lg:placeholder:text-xs
    border border-neutral-600 border-accent
    bg-neutral-800 text-foreground
    px-2.5 py-1.5
    outline-none 
  "
                  >
                    <option value="" disabled className="bg-background text-foreground">
                      Select Category
                    </option>

                    {categories.map((items: any, idx: number) => (
                      <option
                        key={idx}
                        value={items.id}
                        className="bg-background text-foreground"
                      >
                        {items.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-2">
            <Button onClick={onClose} variant={'outline'} className={cn('text-xs lg:text-sm')}>Cancel</Button>
            <Button type="submit" form="product-form" className="flex items-center gap-1 text-xs lg:text-sm" disabled={loading}>
              {loading ? <><Loader2 size={16} className="animate-spin" />Saving product...</> : "Save Product"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default EditProductModal
