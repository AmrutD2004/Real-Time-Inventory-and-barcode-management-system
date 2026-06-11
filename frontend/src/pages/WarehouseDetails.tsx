import { getWarehouseById, getWarehouseStock } from '@/api/endpoint';
import Layout from '@/components/layout/Layout'
import AddStock from '@/components/modals/StocksModal/AddStock';
import EditWarehouseModal from '@/components/modals/WarehouseModals/EditWarehouseModal';
import MovementHistory from '@/components/Tables/MovementHistory';
import WarehouseStocksTable from '@/components/Tables/WarehouseStocksTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductContext } from '@/context/ProductContext';
import { WareHouseContext } from '@/context/WarehouseInventoryContext';
import socket from '@/lib/socket';
import { cn } from '@/lib/utils';
import type { Warehous } from '@/types/warehouse';
import { decodeId } from '@/utils/IdEncrypter';
import { AlertCircle, BookText, ChevronLeft, Container, Loader2, MapPin, Pencil, Plus, Rows3, ShelvingUnit, Warehouse } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner';

const WarehouseDetails = () => {
  const { warehouses } = useContext(WareHouseContext)
  const { categories, allProducts } = useContext(ProductContext)
  const { id } = useParams();
  const [stockLoading, setStockLoading] = useState<boolean>(false)
  const [warehouseId, setWareHouseId] = useState('')
  const handledecode = async (id: string) => {
    const decode = await decodeId(id)
    setWareHouseId(String(decode))
  }

  useEffect(() => {
    handledecode(String(id))
  }, [id])

  const [warehouse, setWareHouse] = useState<Warehous | null>(null)

  const fetchWarehouseDetail = async (id: number) => {
    const data = await getWarehouseById(id)
    if (data?.success) {
      setWareHouse(data?.data)
    }
  }
  const [warehouseStocks, setWarehouseStocks] = useState<[]>([])
  const fetchWarehouseStocks = async (id: number) => {
    setStockLoading(true)
    const data = await getWarehouseStock(id)
    if (data?.success) {
      setWarehouseStocks(data?.data)
    }
    setStockLoading(false)
  }

  useEffect(() => {
    if (!warehouseId) return
    fetchWarehouseDetail(Number(warehouseId))
    fetchWarehouseStocks(Number(warehouseId))
  }, [warehouseId])

  useEffect(()=>{
    if(!warehouseId) return
    socket.connect()
    socket.on('connect', () => {
        console.log('✅ Socket connected:', socket.id)
    })
    socket.emit('join_warehouse', warehouseId)

    socket.on('stock_updated', (data) => {
        console.log('Stock updated:', data)
         toast.info(`${data.productName} stock updated — ${data.type} ${data.difference} units`)
        fetchWarehouseStocks(Number(warehouseId))  // refresh stock list
    })
    return () => {
        socket.off('stock_updated')
        socket.disconnect()
    }
  }, [warehouseId])


  const [openAddStock, setOpenaddstock] = useState<boolean>(false)
  const [openEdit, setOpenedit] = useState<boolean>(false)
  const [inventory, setInventory] = useState('stockInventory')
  const lowStock = warehouseStocks.filter((f: any) => f?.quantity < f?.low_stock_threshold).length

  if (!warehouse) {
    return (
      <Layout>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='flex items-center gap-1'>
            <Loader2 size={20} className='animate-spin' />
            <h1 className='text-base text-muted-foreground'>Loading warehouse details...</h1>
          </div>
        </div>
      </Layout>
    )
  }
  const grid = [
    {
      id: 1,
      title: 'Products stored',
      icon: <ShelvingUnit />,
      iconColor: 'text-blue-500',
      number: warehouses.length,
      subheding: `across ${categories.length} categories`
    },
    {
      id: 2,
      title: 'Total Capacity',
      icon: <Container />,
      iconColor: 'text-green-500',
      number: warehouse?.warehouseCapacity,
      subheding: `across ${categories.length} categories`
    },
    {
      id: 3,
      title: 'Low Stock Alert',
      icon: <AlertCircle />,
      iconColor: 'text-red-500',
      number: lowStock,
      subheding: `across ${categories.length} categories`
    },
  ]
  return (
    <>
      <Layout>
        <div className='max-w-6xl mx-auto'>
          <Link to={'/warehouse'} className='flex items-center gap-1 text-xs text-muted-foreground hover:text-accent-foreground/80 transition-color duration-200'>
            <ChevronLeft size={16} /> Back
          </Link>
          <div className='w-full border rounded-lg shadow flex items-center justify-between px-5 py-3 mt-10'>
            <div className='flex items-center gap-3'>
              <Badge variant={'outline'} className={cn('px-2 py-3 rounded-lg lg:scale-130')}><Warehouse size={20} /></Badge>
              <div className='flex items-start flex-col gap-1'>
                <h1 className='text-lg font-semibold text-accent-foreground tracking-tight leading-tight flex items-center gap-2'>{warehouse?.warehouseName}<Badge variant={warehouse?.warehouseStatus === 'Inactive' ? 'destructive' : 'default'}>{warehouse?.warehouseStatus}</Badge></h1>
                <div className='flex items-start justify-start gap-2'>
                  <span className='text-muted-foreground text-xs flex items-center gap-1 tracking-tight leading-tight font-medium'><MapPin size={16} />{warehouse?.warehouseLocation}</span>
                  <span className='text-muted-foreground text-xs flex items-center gap-1 tracking-tight leading-tight font-mono font-medium'><BookText size={16} />WH-00{warehouse?.id}</span>
                  <span className='text-muted-foreground text-xs flex items-center gap-1 tracking-tight leading-tight font-medium'><Rows3 size={16} />{!warehouse?.warehouseRackInfo ? 'N/A' : warehouse?.warehouseRackInfo}</span>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Button onClick={() => setOpenedit(true)} variant={'outline'} className={cn('flex items-center gap-1')}><Pencil />Edit</Button>
              <Button onClick={() => setOpenaddstock(true)} className={cn('flex items-center gap-1')}><Plus />Assign Stock</Button>
            </div>
          </div>
          <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-5'>
            {grid.map((items: any) => (
              <div key={items.id} className='w-full border rounded-lg px-5 py-3 flex flex-col gap-1'>
                <div className='flex items-center gap-2'>
                  <span className={`${items.iconColor}`}>{items.icon}</span>
                  <h1 className='text-base tracking-tight font-medium'>{items.title}</h1>
                </div>
                <h1 className='text-3xl mt-2 font-semibold'>{items.number}</h1>
                <span className='text-muted-foreground text-xs tracking-tight'>{items.subheding}</span>
              </div>
            ))}
          </div>

          <div className='flex items-center justify-start gap-1 mt-8 gap-5'>
            <div onClick={() => setInventory('stockInventory')} className={`relative w-40 text-center cursor-pointer`}>
              <span className={`absolute w-full py-0.5 bg-accent-foreground -bottom-2 left-0 rounded-full ${inventory === 'stockInventory' ? "opacity-100" : "opacity-0"}`}></span>
              <span>Stock inventory</span>
            </div>
            <div onClick={() => setInventory('movementHistory')} className={`relative w-40 text-center cursor-pointer`}>
              <span className={`absolute w-full py-0.5 bg-accent-foreground -bottom-2 left-0 rounded-full ${inventory === 'movementHistory' ? "opacity-100" : "opacity-0"}`}></span>
              <span>Movement history</span>
            </div>
          </div>
          {inventory === 'stockInventory' && <WarehouseStocksTable warehouseStocks={warehouseStocks} warehouse={warehouse} loading={stockLoading} onStockAdded={() => fetchWarehouseStocks(Number(warehouseId))} />}
          {inventory === 'movementHistory' && <MovementHistory warehouseId={Number(warehouseId)} inventory={inventory}/>}
        </div>
      </Layout>
      {openAddStock && <AddStock warehouse={warehouse} categories={categories} onClose={() => setOpenaddstock(false)} products={allProducts} onStockAdded={() => fetchWarehouseStocks(Number(warehouseId))} />}
      {openEdit && <EditWarehouseModal warehouse={warehouse} onClose={() => setOpenedit(false)} />}
    </>
  )
}

export default WarehouseDetails
