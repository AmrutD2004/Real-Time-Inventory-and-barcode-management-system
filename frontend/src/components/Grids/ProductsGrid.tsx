import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { BookText, Download, EllipsisVertical, Loader2, Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ProductContext } from '@/context/ProductContext'
import EditProductModal from '../modals/ProductsModals/EditProductModal'
import DeleteProductModal from '../modals/ProductsModals/DeleteProductModal'
import type { Product } from '@/types/product'
import { Input } from '../ui/input'



type Props = {
  products: Product[]
  setSkip: React.Dispatch<React.SetStateAction<number>>
  skip: number
}

const ProductsGrid = ({
  products,
  setSkip,
  skip,
}: Props) => {

  const {
    totalProducts,
    take,
    setTake,
  } = useContext(ProductContext)

  const noOfPages = Math.ceil(totalProducts / take)

  const handlePrevious = () => {
    setSkip((prev: number) =>
      Math.max(prev - take, 0)
    )
  }

  const handleNext = () => {
    if (skip + take < totalProducts) {
      setSkip((prev: number) => prev + take)
    }
  }
  const [openMenu, setOpenMenu] = useState<null | number>(null)
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const [loading, setLoading] = useState(false)
  const downloadBarcode = async (barcodeUrl: string, sku: string) => {
    setLoading(true)
    const response = await fetch(barcodeUrl);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${sku}-barcode.png`;
    a.click();

    window.URL.revokeObjectURL(url);
    setLoading(false)
  };
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([])
  useEffect(() => {
    setSearchedProducts(products)
  }, [products])
  const handleSearched = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase()
    if (!keyword) {
      setSearchedProducts(products)
    }
    const filterd = products.filter((f: any) => f?.name.toLowerCase().includes(keyword))
    setSearchedProducts(filterd)
  }
  return (
    <>
      <div className='mb-5 w-full'>
        <Input onChange={(e) => handleSearched(e)} className="w-full lg:placeholder:text-sm placeholder:text-xs px-3" placeholder="Search Category..." />
      </div>
      <div className='flex flex-col gap-10'>

        {/* Products Grid */}
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3'>

          {searchedProducts.map((item: Product) => (
            <div
              key={item.id}
              className='w-full flex items-center justify-center border rounded-lg px-5 py-3 shadow'
            >
              <div className='flex flex-col gap-5'>

                <img
                  src={item.image_url}
                  alt={item.name}
                  className='object-cover w-full h-32 rounded-lg'
                />

                <div className='flex flex-col items-start gap-3'>

                  <h1 className='text-sm font-medium'>
                    {item.name}
                  </h1>

                  <div className='flex flex-col gap-1'>
                    <p className='text-xs text-muted-foreground'>
                      SKU : {item.sku}
                    </p>

                    <p className='text-xs text-muted-foreground flex items-center'>
                      Barcode : {item.barcodeNo}
                    </p>

                    <p className='text-base font-medium'>
                      ₹{item.price}
                    </p>
                  </div>

                  <div className='w-full flex justify-end mt-auto h-full relative'>
                    <Button
                      onClick={() => {

                        setOpenMenu(openMenu === item.id ? null : item.id)
                      }}
                      variant='outline'
                      className={cn('px-2 py-2 mt-auto')}
                    >
                      <EllipsisVertical />
                    </Button>
                    {openMenu === item.id ? (
                      <div className='w-45 -top-22 bg-background text-accent-foreground font-medium px-5 py-2 rounded-lg absolute shadow border flex flex-col items-start justify-start gap-2'>
                        <button className='text-xs flex items-center gap-1'><BookText size={14} />View Details</button>
                        <button onClick={() => {
                          setSelectedProduct(item)
                          setOpenEditModal(true)
                        }} className='text-xs flex items-center gap-1'><Pencil size={14} />Edit</button>
                        <button onClick={() => {
                          setSelectedProduct(item)
                          setOpenDeleteModal(true)
                        }} className='text-xs flex items-center gap-1 text-destructive font-medium'><Trash2 size={14} />Delete</button>
                        <button onClick={() => downloadBarcode(item?.barcodeImage, item?.sku)} className='cursor-pointer text-xs text-accent-foreground flex items-center gap-1'>{loading ? <> <Loader2 />'Downloading</> : <><Download size={16} />Download Barcode</>}</button>
                      </div>
                    ) : null}
                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Footer */}
        <div className='flex items-center justify-between flex-wrap gap-4'>

          {/* Product Count */}
          <div>
            <p className='text-sm text-muted-foreground'>
              Showing{" "}
              <strong>{skip + 1}</strong>
              {" "}to{" "}
              <strong>
                {Math.min(skip + take, totalProducts)}
              </strong>
              {" "}out of{" "}
              <strong>{totalProducts}</strong>
            </p>
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>

              <PaginationItem>
                <Button
                  variant="outline"
                  disabled={skip === 0}
                  onClick={handlePrevious}
                >
                  <PaginationPrevious />
                </Button>
              </PaginationItem>

              {[...Array(noOfPages).keys()].map((page) => {

                const pageSkip = page * take

                return (
                  <PaginationItem key={page}>
                    <Button
                      variant={
                        skip === pageSkip
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setSkip(pageSkip)
                      }
                    >
                      {page + 1}
                    </Button>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <Button
                  variant="outline"
                  disabled={skip + take >= totalProducts}
                  onClick={handleNext}
                >
                  <PaginationNext />
                </Button>
              </PaginationItem>

            </PaginationContent>
          </Pagination>

          {/* Page Size */}
          <div>
            <select
              value={take}
              onChange={(e) => {
                setTake(Number(e.target.value))
                setSkip(0)
              }}
              className='bg-background border rounded-lg px-4 py-2 text-sm'
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
          </div>

        </div>

      </div>
      {openEditModal && <EditProductModal selectedProduct={selectedProduct} onClose={() => setOpenEditModal(false)} />}
      {openDeleteModal && <DeleteProductModal selectedProduct={selectedProduct} onClose={() => setOpenDeleteModal(false)} />}
    </>
  )
}

export default ProductsGrid