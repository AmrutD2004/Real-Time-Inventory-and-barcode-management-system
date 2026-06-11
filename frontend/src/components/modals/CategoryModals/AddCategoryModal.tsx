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
import { Textarea } from '../../ui/textarea'
import { Loader2 } from 'lucide-react'
import { addCategory } from '@/api/endpoint'
import { toast } from 'sonner'
import { ProductContext } from '@/context/ProductContext'

type porps = {
    onClose : ()=>void
}
const AddCategoryModal = ({onClose} : porps) => {
  const {fetchCategories} = useContext(ProductContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        categoryname : '',
        description : ''
    })
    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name] : value}))
    }
    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true)
        try{
          const payload = {
            name : formData.categoryname,
            description : formData.description
          }
          const data = await addCategory(payload)
          if(data?.success){
            toast.success(data?.message)
            fetchCategories()
            setFormData({
            categoryname : '',
            description : ''
          })

          setTimeout(()=>{
            onClose()
          }, 1000)
          // fetchCategories()
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
        <CardTitle>Add Category</CardTitle>
        <CardDescription>
          Add categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id='category-form' onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Category Name</Label>
              <Input
              value={formData.categoryname}
              onChange={handleChange}
                name="categoryname"
                type="text"
                placeholder="Enter category"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Description</Label>
              </div>
             
               <Textarea value={formData.description}
              onChange={handleChange} name="description" id="password" required placeholder="Category Information" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        <Button onClick={onClose} variant={'outline'}>Cancel</Button>
        <Button type="submit" form="category-form" className="flex items-center gap-1" disabled={loading}>
          {loading ? <><Loader2 size={16} className="animate-spin"/>Adding category...</> : "Add Category"}
        </Button>
      </CardFooter>
    </Card>
        </div>
    </div>
  )
}

export default AddCategoryModal
