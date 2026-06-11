import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import EditStock from '../modals/StocksModal/EditStock'

type WarehouseStock = {
    id: number
    quantity: number
    low_stock_threshold: number
    product: {
        name: string
    }
}

type Props = {
    warehouseStocks: WarehouseStock[]
    warehouse: {
        warehouseName: string
    }
    loading: boolean,
    onStockAdded: () => void
}

const WarehouseStocksTable = ({
    warehouseStocks,
    warehouse, loading,
    onStockAdded
}: Props) => {

    const [open, setOpen] = useState<boolean>(false)
    const [selectedStock, setSelectedStock] = useState<null | {}>(null)
    return (
        <>
            <div className="flex flex-col gap-2 mt-5">
                <Table
                    className="border"
                    onClick={(e) => e.stopPropagation()}
                >
                    <TableCaption>
                        A list of available stock in warehouse{" "}
                        <span className="font-medium underline">
                            {warehouse?.warehouseName}
                        </span>
                    </TableCaption>

                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-start uppercase text-xs px-5 font-medium text-muted-foreground">
                                Product
                            </TableHead>

                            <TableHead className="text-start uppercase text-xs font-medium text-muted-foreground">
                                Qty
                            </TableHead>

                            <TableHead className="text-center uppercase text-xs font-medium text-muted-foreground">
                                Threshold
                            </TableHead>

                            <TableHead className="text-center uppercase text-xs font-medium text-muted-foreground">
                                Status
                            </TableHead>

                            <TableHead className="text-center uppercase text-xs font-medium text-muted-foreground">
                                Action
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
                            ) : warehouseStocks.length > 0 ? (
                                warehouseStocks.map((item) => (
                                    (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium px-5">
                                                {item.product?.name}
                                            </TableCell>

                                            <TableCell className={`text-start ${item?.quantity >= item?.low_stock_threshold ? 'text-green-500' : item?.quantity >= item?.low_stock_threshold * 0.5 ? 'text-yellow-500' : 'text-red-500'}`}>
                                                {item.quantity}
                                            </TableCell>

                                            <TableCell className="text-center text-muted-foreground font-medium">
                                                ≥ {item.low_stock_threshold}
                                            </TableCell>

                                            <TableCell className={`text-center`}>
                                                <span className={`px-2 py-0.5 rounded-full font-medium ${item?.quantity >= item?.low_stock_threshold ? 'text-green-600 bg-green-100 border border-green-500 ' : item?.quantity >= item?.low_stock_threshold * 0.5 ? 'text-yellow-600 bg-yellow-100 border-yellow-500' : 'text-red-500 bg-red-100 border border-red-500'}`}>{item?.quantity >= item?.low_stock_threshold ? 'Ok' : item?.quantity >= item?.low_stock_threshold * 0.5 ? 'Mid' : 'Low'}</span>
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Button onClick={() => {
                                                    setOpen(true)
                                                    setSelectedStock(item)
                                                }}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                ))
                            ) : (
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
            {open && <EditStock onClose={() => setOpen(false)} selectedStock={selectedStock} onStockAdded={onStockAdded} />}
        </>
    )
}

export default WarehouseStocksTable