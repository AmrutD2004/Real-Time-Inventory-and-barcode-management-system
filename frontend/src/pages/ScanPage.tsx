import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Barcode, Camera, CameraOff, ScanBarcode, Search, Video, Warehouse } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { getProductBySearch, getWarehouseStock } from '@/api/endpoint'
import type { Product } from '@/types/product'
import { Badge } from '@/components/ui/badge'
import dayjs from 'dayjs'
import EditStock from '@/components/modals/StocksModal/EditStock'
import { useNavigate } from 'react-router-dom'
import { encodeId } from '@/utils/IdEncrypter'

const ScanPage = () => {
    const navigate = useNavigate()
    const [cameraOn, setCameraOn] = useState<boolean>(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const scannerRef = useRef<BrowserMultiFormatReader | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState('')
    const [searchData, setSearchedData] = useState<Product | null>(null)

    const startScan = async () => {
        setCameraOn(true);

        const scanner = new BrowserMultiFormatReader();
        scannerRef.current = scanner;

        try {
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            })
            await scanner.decodeFromVideoDevice(
                "bf858c1c72fae50c63e409b4cc17dd7a5f39ac4c6a5bdacdb346b8f8a6f612e2",
                videoRef.current!,
                (result, error) => {
                    if (result) {
                        console.log("SCANNED:", result.getText());
                    }

                    if (error) {
                        console.log(error.name);
                    }
                }
            );
        } catch (err) {
            console.error(err);
            setCameraOn(false);
        }
    };
    const stopScan = () => {
        scannerRef.current?.reset()
        setCameraOn(false)
    }

    const fetchProduct = async () => {
        const skuToSearch = search
        if (!skuToSearch) return
        setLoading(true)
        try {
            const data = await getProductBySearch(skuToSearch)
            if (data?.success) {
                setSearchedData(data?.data)
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        fetchProduct()
    }
    const totalStock = searchData?.stock?.reduce((sum: number, s: any) => sum + s.quantity, 0)
    const [openEditModal, setEditModal] = useState(false)
    const [selectedStock, setSelectedStock] = useState(null)
    const handleId = async(warehouseid : number)=>{
            const id = await encodeId(warehouseid)
            navigate(`/warehouse/${id}`)
        }
    return (
        <>
            <Layout>
                <div className='flex flex-col items-start justify-start gap-1'>
                    <h1 className='text-4xl text-accent-foreground font-medium tracking-tight'>Scan product</h1>
                    <p className='text-xs tracking-tight text-muted-foreground font-medium'>Scan a barcode or enter SKU to look up a product</p>
                </div>
                <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 items-start'>
                    <div className='border rounded-lg shadow px-5 py-3 '>
                        <h1 className='uppercase font-medium tracking-tight text-muted-foreground text-sm'>Camera scanner</h1>
                        <div className='w-full border my-3 h-52 rounded-lg flex items-center justify-center overflow-hidden relative '>
                            <video
                                ref={videoRef}
                                className={cn('w-full h-full object-cover', !cameraOn && 'hidden')}
                            />
                            {!cameraOn && (
                                <div className='flex flex-col items-center justify-center text-muted-foreground gap-2'>
                                    <CameraOff size={42} />
                                    Camera is off
                                </div>
                            )}
                        </div>
                        <div className='flex items-center justify-center w-full mt-5 mb-10'>
                            {!cameraOn ? <Button onClick={() => startScan()} className={cn('flex items-center gap-2')}><Camera />Start the camera</Button>
                                :
                                <Button onClick={() => stopScan()} className={cn('flex items-center gap-2')}><CameraOff />Off the camera</Button>
                            }
                        </div>
                        <div className='border rounded-lg shadow px-5 py-3'>
                            <h1 className='uppercase font-medium tracking-tight text-muted-foreground text-sm'>Manual / handheld scanner</h1>
                            <p className='font-medium tracking-tight text-muted-foreground text-xs'>Scan with handheld scanner or type SKU manually</p>
                            <form onSubmit={handleSearch} className='flex flex-col items-start justify-start gap-1 mt-5'>
                                <Input name='search' required type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Enter SKU' />
                                <Button type='submit' className={cn('mt-2 flex items-center gap-2')}><Search />Search</Button>
                            </form>
                        </div>
                    </div>
                    <div className='border rounded-lg shadow h-full'>
                        <h1 className='uppercase font-medium tracking-tight text-muted-foreground text-sm px-5 py-3'>Product Result</h1>
                        {!searchData ? (
                            <div className='flex items-center justify-center w-full h-full text-muted-foreground'>
                                <div className='flex flex-col items-center justify-center w-full'>
                                    <ScanBarcode />
                                    No product scanned yet or searched
                                    <p className='text-xs text-muted-foreground'>
                                        Scan a barcode to see product details
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col items-start justify-center w-full my-3 text-muted-foreground'>
                                <div className='w-full'>
                                    <div className='flex items-center gap-3 px-5 py-3'>
                                        <img
                                            src={searchData.image_url}
                                            alt={searchData.name}
                                            className='w-20 rounded-lg h-auto'
                                        />
                                        <div className='flex flex-col items-start gap-1 text-accent-foreground font-medium'>
                                            <h1>{searchData?.name}</h1>
                                            <p className='text-xs text-muted-foreground font-medium'>{searchData?.sku}</p>
                                            <Badge>{searchData?.category?.name}</Badge>
                                        </div>
                                    </div>
                                    <div className='w-full border'>
                                        <div className='flex items-center '>
                                            <div className='px-5 py-3 flex flex-col items-start gap-2 border w-full'>
                                                <span className='text-muted-foreground text-xs tracking-tight font-medium uppercase'>Price</span>
                                                <h1 className='text-base font-medium tracking-tight text-accent-foreground'>₹{searchData?.price}</h1>
                                            </div>
                                            <div className='px-5 py-3 flex flex-col items-start gap-2 w-full'>
                                                <span className='text-muted-foreground text-xs tracking-tight font-medium uppercase'>Created</span>
                                                <h1 className='text-base font-medium tracking-tight text-accent-foreground'>{dayjs(searchData?.created_at).format('DD MMM YYYY')}</h1>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='px-5 py-3 flex flex-col items-start gap-2 border w-full'>
                                                <span className='text-muted-foreground text-xs tracking-tight font-medium uppercase'>Total stock</span>
                                                <h1 className='text-base font-medium tracking-tight text-green-500'>{totalStock} units</h1>
                                            </div>
                                            <div className='px-5 py-3 flex flex-col items-start gap-2 border w-full'>
                                                <span className='text-muted-foreground text-xs tracking-tight font-medium uppercase'>Warehouses</span>
                                                <h1 className='text-base font-medium tracking-tight text-accent-foreground'>{searchData?.stock?.length}</h1>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='flex flex-col items-start justify-start gap-2 px-5 py-3 w-full'>
                                    <h1 className='flex items-center gap-2 text-muted-foreground tracking-tight uppercase text-xs font-medium '><Warehouse size={16} />Stock across warehouses</h1>
                                    <div className='flex flex-col items-start justify-start gap-3 w-full'>
                                        {searchData?.stock.map((item: any) => (
                                            <div className='flex items-center justify-between w-full border-b pb-1 mt-3 gap-2'>
                                                <Button variant={'ghost'} className='flex items-center gap-2 text-muted-foreground tracking-tight text-xs font-medium'><Warehouse size={16} />{item?.warehouse?.warehouseName}</Button>
                                               <div className='flex items-center gap-3'>
                                                 <h1 className={`text-start flex items-center gap-3 ${item?.quantity >= item?.low_stock_threshold ? 'text-green-500' : item?.quantity >= item?.low_stock_threshold * 0.5 ? 'text-yellow-500' : 'text-red-500'}`}>{item?.quantity} <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${item?.quantity >= item?.low_stock_threshold ? 'text-green-600 bg-green-100 border border-green-500 ' : item?.quantity >= item?.low_stock_threshold * 0.5 ? 'text-yellow-600 bg-yellow-100 border-yellow-500' : 'text-red-500 bg-red-100 border border-red-500'}`}>{item?.quantity >= item?.low_stock_threshold ? 'Ok' : item?.quantity >= item?.low_stock_threshold * 0.5 ? 'Mid' : 'Low'}</span></h1>
                                                <Button onClick={() => {
                                                    setEditModal(true)
                                                    setSelectedStock(item)
                                                }} variant={'outline'}>Update</Button>
                                               </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='flex flex-col items-start justify-start gap-2 px-5 py-3 w-full border-t'>
                                    <h1 className='flex items-center gap-2 text-muted-foreground tracking-tight uppercase text-xs font-medium '><Barcode size={16} />Barcode label</h1>
                                    <div className='flex items-center justify-between w-120 lg:ms-10 md:ms-10 pb-1 mt-3 '>
                                        <img src={searchData?.barcodeImage} alt={`${searchData?.name}-image`} className='w-30 bg-white' />
                                        <a href={searchData?.barcodeImage} download={`${searchData?.sku}-barcode.png}`}> <Button variant={'outline'}>Download</Button></a>
                                    </div>
                                </div>
                                <div className='flex flex-col items-start justify-start gap-2 px-5 py-3 w-full border-t'>
                                        <Button onClick={() => {
                                            setSearchedData(null)
                                            setSearch('')
                                        }} variant={'outline'}>Reset</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
            {openEditModal && <EditStock selectedStock={selectedStock} onClose={() => { setEditModal(false) }} onStockAdded={() => fetchProduct()} />}
        </>
    )
}

export default ScanPage
