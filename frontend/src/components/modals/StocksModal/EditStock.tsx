import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { editStock } from '@/api/endpoint'
type props = {
    onClose: () => void,
    selectedStock: any,
    onStockAdded : ()=>void
}
const EditStock = ({ onClose, selectedStock , onStockAdded}: props) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        quantity: selectedStock?.quantity ? selectedStock?.quantity : '',
        low_stock_threshold: selectedStock?.low_stock_threshold ? selectedStock?.low_stock_threshold :'10',
        note : ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try{
            const payload = {
                quantity : Number(formData.quantity),
                low_stock_threshold : formData.low_stock_threshold,
                note : formData.note,
                prevQuantity : Number(selectedStock?.quantity)
            }
            const data = await editStock(payload, Number(selectedStock?.id))
            if(data?.success){
                toast.success(data?.message)
                onStockAdded()
                setTimeout(()=>{
                    onClose();
                }, 2000)

            }
        }catch(err : any){
            toast.error(err?.response?.message?.data)
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
                        <CardTitle>Edit stock</CardTitle>
                        <CardDescription>
                            {selectedStock?.product?.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id='add-warehouse' onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label>New quantity *</Label>
                                    </div>
                                    <Input onChange={handleChange} name='quantity' placeholder='eg., 100' required value={formData.quantity}/>
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label>Low Stock Threshold</Label>
                                    </div>
                                    <Input value={formData.low_stock_threshold} onChange={handleChange} name='low_stock_threshold' placeholder='Enter warehouse rack info' required />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label>Note (optional)</Label>
                                    </div>
                                    <Textarea value={formData.note} onChange={handleChange} name='note' placeholder='Why changes have to made' />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex items-center justify-end gap-2">
                        <Button variant={'outline'} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button form='add-warehouse' disabled={loading} type="submit">
                            {loading ? <span className='flex items-center gap-1'><Loader2 />Saving changes </span> : 'Save Changes'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>

        </div>
    )
}

export default EditStock
