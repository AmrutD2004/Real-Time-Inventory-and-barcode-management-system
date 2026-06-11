import { deleteCategory } from '@/api/endpoint'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductContext } from '@/context/ProductContext'
import { Loader2 } from 'lucide-react'
import { useContext, useState } from 'react'
import { toast } from 'sonner'

type props = {
    category: any,
    onClose: () => void
}
const CategoryDeleteModal = ({ category, onClose }: props) => {
    const { fetchCategories } = useContext(ProductContext)
    const [loading, setLoading] = useState<boolean>(false)
    const handleDelete = async (id: number) => {
        setLoading(true)
        try {
            const data = await deleteCategory(id)
            if (data?.success) {
                toast.success(data?.message)
                fetchCategories()
                setTimeout(() => {
                    onClose();
                }, 2000)
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='fixed inset-0 bg-black/30 z-50'>
            <div className='flex items-center justify-center min-h-screen'>
                <Card className="w-full max-w-sm mx-2">
                    <CardHeader>
                        <CardTitle>Do you really want to delete <span className='font-semibold'>{category.name}</span> ?</CardTitle>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-end gap-2">
                        <Button onClick={onClose} variant={'outline'}>Cancel</Button>
                        <Button onClick={() => handleDelete(category?.id)} variant={'destructive'} type="submit" form="category-form" className="flex items-center gap-1 tracking-tight" disabled={loading}>
                            {loading ? <><Loader2 size={16} className="animate-spin" />Saving Changes...</> : "Delete"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default CategoryDeleteModal
