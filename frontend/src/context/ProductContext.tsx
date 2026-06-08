import { createContext, useContext, useEffect, useState } from "react";
import { UserInfoContext } from "./userInfoContext";
import { getAllCategories, getAllProducts, getAllProductsOnce } from "@/api/endpoint";

export const ProductContext = createContext<any | null>(null)

export const ProductContextProvider = ({children} : {children : React.ReactNode})=>{
    const {isLoggedIn} = useContext(UserInfoContext)
    //Categories
    const [categories, setCategories] = useState<[]>([])
    const fetchCategories = async()=>{
        const data = await getAllCategories()
        if(data?.success){
            setCategories(data?.data)
        }
    }
    useEffect(()=>{
        fetchCategories()
    }, [isLoggedIn])

    //Products
    const [products, setProducts] = useState<[]>([])
    const [skip, setSkip] = useState<number>(0)
    const [take, setTake] = useState<number>(5)
    const [totalProducts, setTotalProducts] = useState(0)
    const [allProducts, setAllProducts] = useState<[]>([])
    const fetchProducts = async(skip : number, take : number)=>{
        const data = await getAllProducts(skip, take)
        if(data?.success){
            setProducts(data.data)
            setTotalProducts(data.totalProducts)
        }
    } 
    useEffect(()=>{
        fetchProducts(skip, take)
    },[skip ,take])

    const fetchAllProducts = async()=>{
        const data = await getAllProductsOnce()
        if(data?.success){
            setAllProducts(data.data)
        }
    } 
    useEffect(()=>{
        fetchAllProducts()
    },[])
    return (
        <ProductContext.Provider value={{
            categories, fetchCategories, setSkip, fetchProducts, skip, products, totalProducts, take, setTake, fetchAllProducts, allProducts
        }}>
            {children}
        </ProductContext.Provider>
    )
}