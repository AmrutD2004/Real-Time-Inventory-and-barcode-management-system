import { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { getStockMovementHistory } from '@/api/endpoint'
import { ArrowDown, ArrowUp, Minus, Plus } from 'lucide-react'
import {formatDistanceToNow } from 'date-fns'

type props = {
    warehouseId: number,
    inventory: string
}
const MovementHistory = ({ warehouseId, inventory }: props) => {
    const [loading, setLoading] = useState(false)
    const [movementHistory, setMovementhistory] = useState<[]>([])


    const fetchMovementHistory = async (id: number) => {
        setLoading(true)
        const data = await getStockMovementHistory(id)
        if (data?.success) {
            setMovementhistory(data?.data)
        }
        setLoading(false)
    }
    useEffect(() => {
        if (inventory === 'movementHistory') {
            fetchMovementHistory(Number(warehouseId))
        }
    }, [inventory, warehouseId])
    return (
        <div className='mt-5'>
            <Table
                className="border"
                onClick={(e) => e.stopPropagation()}
            >
                <TableCaption>
                    Movement history{" "}
                    <span className="font-medium underline">
                    </span>
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead className="text-start uppercase text-xs px-5 font-medium text-muted-foreground">
                            Product
                        </TableHead>

                        <TableHead className="text-start uppercase text-xs font-medium text-muted-foreground">
                            Type
                        </TableHead>

                        <TableHead className="text-center uppercase text-xs font-medium text-muted-foreground">
                            QTY
                        </TableHead>

                        <TableHead className="text-center uppercase text-xs font-medium text-muted-foreground">
                            Changed by
                        </TableHead>

                        <TableHead className="text-center uppercase text-xs font-medium text-muted-foreground">
                            Note
                        </TableHead>
                        <TableHead className="text-center uppercase text-xs font-medium text-muted-foreground">
                            when
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {loading
                        ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    Loading stocks...
                                </TableCell>
                            </TableRow>
                        ) : movementHistory.length > 0 ? (
                            movementHistory.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell className='w-80'>{item.product?.name}</TableCell>

                                    <TableCell className='w-10'>
                                        {item.type === 'IN'
                                            ? <span className="text-green-600 flex items-center justify-start gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 border border-green-500"><ArrowUp size={16}/>IN</span>
                                            : <span className="text-red-600 flex items-center justify-start gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 border border-red-500"><ArrowDown size={16}/>OUT</span>
                                        }
                                    </TableCell>

                                    <TableCell className="text-center w-10">
                                        {item.type === 'IN'
                                            ? <span className="text-green-600 flex items-center justify-start gap-1 text-xs font-medium "><Plus size={16}/>{item?.quantity}</span>
                                            : <span className="text-red-600 flex items-center justify-start gap-1 text-xs font-medium "><Minus size={16}/>{item?.quantity}</span>
                                        }
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {item?.user?.email.split('@')[0]}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {item.note || 'N/A'}
                                    </TableCell>

                                    <TableCell className="text-center text-muted-foreground">
                                        {formatDistanceToNow(new Date(item.created_at), {addSuffix : true})}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) :

                            (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-muted-foreground"
                                    >
                                        No stock available
                                    </TableCell>
                                </TableRow>
                            )}
                </TableBody>
            </Table>
        </div>
    )
}

export default MovementHistory
