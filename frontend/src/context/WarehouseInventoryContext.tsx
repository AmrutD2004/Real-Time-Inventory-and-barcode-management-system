import { getAllWarehouse, getAllWarehouseStock, getStockMovementHistory, getStockMovementLast7days } from "@/api/endpoint";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserInfoContext } from "./userInfoContext";

export const WareHouseContext = createContext<null | any>(null)

export const WareHouseContextProvider = ({children} : {children : React.ReactNode})=>{
    const {isLoggedIn} = useContext(UserInfoContext)
    const [warehouses, setWarehouses] = useState<[]>([])
    const fetchWarehouses = async()=>{
        const data = await getAllWarehouse()
        if(data?.success){
            setWarehouses(data?.data)
        }
    }

    useEffect(()=>{
        fetchWarehouses()
    }, [isLoggedIn])
    return (
        <WareHouseContext.Provider value={{
            warehouses, fetchWarehouses
        }}>
            {children}
        </WareHouseContext.Provider>
    )
}

export const StockContext = createContext<any | null>(null)

export const StockContextProvider = ({children} : {children : React.ReactNode})=>{
    const [allWarehouseStock, setAllWarehouseStock] = useState([])
    const fetchallWarehouseStock = async()=>{
        const data = await getAllWarehouseStock()
        if(data?.success){
            setAllWarehouseStock(data?.data)
        }
    }
    useEffect(()=>{
        fetchallWarehouseStock()
    }, [])
    const [loading, setLoading] = useState(false)
        const [movementlast7daysHistory, setMovementlast7dayshistory] = useState<[]>([])
    
    
        const fetchMovementlast7daysHistory = async () => {
            setLoading(true)
            const data = await getStockMovementLast7days()
            if (data?.success) {
                setMovementlast7dayshistory(data?.data)
            }
            setLoading(false)
        }
        useEffect(()=>{
        fetchMovementlast7daysHistory()
    }, [])
    return (
        <StockContext.Provider value={{
            fetchallWarehouseStock, allWarehouseStock, fetchMovementlast7daysHistory, movementlast7daysHistory
        }}>
            {children}
        </StockContext.Provider>
    )
}