import ProductsGrid from '@/components/Grids/ProductsGrid'
import Layout from '@/components/layout/Layout'
import AddProductModal from '@/components/modals/ProductsModals/AddProductsModal'
import { Button } from '@/components/ui/button'
import { ProductContext } from '@/context/ProductContext'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import React, { useContext, useState } from 'react'

const Products = () => {
    const { categories, products, setSkip, fetchProducts, skip } = useContext(ProductContext)
        const [open, setOpen] = useState<boolean>(false)
  return (
    <>
            <Layout>
                <div className='w-full'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between gap-3 w-full'>
                        <div className='flex flex-col items-start justify-start gap-1'>
                            <h1 className='text-4xl font-medium text-accent-foreground tracking-tight'>Products</h1>
                            <p className='text-xs tracking-tight text-muted-foreground'>Add and manage products</p>
                        </div>
                        <Button onClick={() => setOpen(true)} className={products.length === 0 ? 'hidden' : cn('flex items-center gap-1 lg:w-35 md:w-35')}><Plus />Add Products</Button>
                    </div>

                    <div className={`${products.length === 0 ? 'hidden' : 'mt-30'}`}>
                        <ProductsGrid products={products} setSkip={setSkip} skip={skip}/>
                    </div>

                    {products.length === 0 && (
                        <div className='flex items-center justify-center min-h-screen'>
                            <div className='flex flex-col items-center justify-center gap-1'>
                                <h1 className='text-muted-foreground'>No Category present</h1>
                                <Button onClick={() => setOpen(true)} className={cn('flex items-center gap-1')}><Plus />Add category</Button>
                            </div>
                        </div>
                    )}

                </div>
            </Layout>
            {open && <AddProductModal onClose={() => setOpen(false)} />}
        </>
  )
}

export default Products
