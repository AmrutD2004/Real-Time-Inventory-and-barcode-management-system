import Layout from '@/components/layout/Layout'
import AddCategoryModal from '@/components/modals/CategoryModals/AddCategoryModal'
import CategoriesTable from '@/components/Tables/CategoriesTable'
import { Button } from '@/components/ui/button'
import { ProductContext } from '@/context/ProductContext'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import React, { useContext, useState } from 'react'

const Categories = () => {
    const { categories } = useContext(ProductContext)
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <Layout>
                <div className='w-full'>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex flex-col items-start justify-start gap-1'>
                            <h1 className='text-4xl font-medium text-accent-foreground tracking-tight'>Categories</h1>
                            <p className='text-xs tracking-tight text-muted-foreground'>Add and manage categories</p>
                        </div>
                        <Button onClick={() => setOpen(true)} className={categories.length === 0 ? 'hidden' : cn('flex items-center gap-1')}><Plus />Add category</Button>
                    </div>

                    <div className={`${categories.length === 0 ? 'hidden' : 'mt-30'}`}>
                        <CategoriesTable categories={categories} />
                    </div>

                    {categories.length === 0 && (
                        <div className='flex items-center justify-center min-h-screen'>
                            <div className='flex flex-col items-center justify-center gap-1'>
                                <h1 className='text-muted-foreground'>No Category present</h1>
                                <Button onClick={() => setOpen(true)} className={cn('flex items-center gap-1')}><Plus />Add category</Button>
                            </div>
                        </div>
                    )}

                </div>
            </Layout>
            {open && <AddCategoryModal onClose={() => setOpen(false)} />}
        </>
    )
}

export default Categories
