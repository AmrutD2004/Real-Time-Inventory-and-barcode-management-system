import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import dayjs from 'dayjs'

import React, { useEffect, useState } from 'react'
import { Button } from "../ui/button"
import { Database, EllipsisVertical, Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import EditCategory from "../modals/CategoryModals/EditCategory"
import { Input } from "../ui/input"
import CategoryDeleteModal from "../modals/CategoryModals/CategoryDeleteModal"
type props = {
    categories: String[]
}

const CategoriesTable = ({ categories }: props) => {
    const [openMenu, setOpenMenu] = useState<null>(null)
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [selectedCategories, setSelectedCategories] = useState<null>(null)

    const [searchedCategories, setSearchedCategories] = useState<String[]>([])
    useEffect(()=>{
        setSearchedCategories(categories)
    }, [categories])
    const handleSearched = (e : React.ChangeEvent<HTMLInputElement>)=>{
        const keyword = e.target.value.toLowerCase()
        if(!keyword){
            setSearchedCategories(categories)
        }
        const filterd = categories.filter((f : any)=>f?.name.toLowerCase().includes(keyword))
        setSearchedCategories(filterd)
    }
    return (
        <div className="w-full" onClick={() => setOpenMenu(null)}>
            <div className="flex flex-col lg:flex-row items-center gap-2 w-full mb-5 ">
                <Input onChange={(e)=> handleSearched(e)} className="w-full lg:placeholder:text-sm placeholder:text-xs px-3" placeholder="Search Category..."/>
                <div className="lg:ms-auto me-auto lg:w-50 flex items-center justify-end gap-1">
                <Database size={16}/><span className="text-sm text-start font-medium tracking-tight text-accent-foreground">Total Categories : {categories.length}</span>
            </div>
            </div>
            <Table className="border" onClick={(e) => e.stopPropagation()}>
                <TableCaption>A list of your categories.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-center">Sr No.</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead>Added At</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {searchedCategories.map((items: any, idx : number) => (
                        <TableRow key={items.id}>
                            <TableCell className="font-medium text-center">{idx + 1}</TableCell>
                            <TableCell className="text-center">{items.name}</TableCell>
                            <TableCell>{dayjs(items.created_at).format('DD MMM YYYY')}</TableCell>
                            <TableCell>{dayjs(items.updated_at).format('DD MMM YYYY')}</TableCell>
                            <TableCell className="text-center relative">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button
                                                onClick={() => setOpenMenu(openMenu === items.id ? null : items.id)}
                                                variant="ghost"
                                                className="px-1 py-2 hover:border hover:border-accent-foreground"
                                            >
                                                <EllipsisVertical />
                                            </Button>
                                        </TooltipTrigger>

                                        <TooltipContent>
                                            <p>Menu</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {openMenu == items.id ? <div className="absolute scale-80 lg:scale-90 -top-10 right-5 lg:right-25 lg:-top-10 z-50 w-26 rounded-xl border border-border bg-background py-2 px-2 shadow-lg backdrop-blur-sm overflow-y-auto hide-scrollbar">

                                    <Button
                                    onClick={() => {
                                        setOpenEditModal(true)
                                        setSelectedCategories(items)
                                    }}
                                        variant="ghost"
                                        className="flex w-full items-center justify-center gap-1 rounded-lg  text-xs font-medium transition-all hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <Pencil />
                                        Edit
                                    </Button>

                                    <Button
                                     onClick={() => {
                                        setOpenDeleteModal(true)
                                        setSelectedCategories(items)
                                    }}
                                        variant="ghost"
                                        className="flex w-full items-center justify-center gap-1 rounded-lg px-3 py-5 text-xs font-medium text-red-500 transition-all hover:bg-red-500/10 hover:text-red-500"
                                    >
                                        <Trash2  />
                                        Delete
                                    </Button>

                                </div> : null}
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
            {openEditModal && <EditCategory category={selectedCategories} onClose={() => setOpenEditModal(false)}/>}
                {openDeleteModal && <CategoryDeleteModal category={selectedCategories} onClose={() => setOpenDeleteModal(false)}/>}
        </div>
    )
}

export default CategoriesTable
