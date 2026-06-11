import axios from 'axios'

const api = axios.create({
    baseURL : import.meta.env.VITE_NODE_URL || 'http://localhost:8080',
    withCredentials : true
})

// User Auth Routes
export const register = async(payload : {})=>{
    const response = await api.post(`/api/user/register`, payload)
    return await response.data
}
export const login = async(payload : {})=>{
    const response = await api.post(`/api/user/login`, payload)
    return await response.data
}

export const logout = async()=>{
    const response = await api.post(`/api/user/logout`)
    return await response.data
}

//Is Authenticated Route
export const isAuthenticated = async()=>{
    const response = await api.get(`/api/user/me`)
    return await response.data
}

// Categories Routes
export const addCategory = async(payload : {})=>{
    const response = await api.post(`/api/category/new`, payload)
    return await response.data
}

export const getAllCategories = async()=>{
    const response = await api.get(`/api/category/all`)
    return await response.data
}

export const editCategory = async(payload : {}, id : number)=>{
    const response = await api.put(`/api/category/update/${id}`, payload)
    return await response.data
}

export const deleteCategory = async(id : number) => {
    const response = await api.delete(`/api/category/delete/${id}`)
    return await response.data
}

//Products Routes
export const addProduct = async(payload : {})=>{
    const response = await api.post(`/api/product/new`, payload, {
        headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    return await response.data
}

export const getAllProducts = async(skip : Number, take : number)=>{
    const response = await api.get(`/api/product/all?skip=${skip}&take=${take}`)
    return response.data
}

export const editProduct = async(payload : {}, id : number)=>{
    const response = await api.put(`/api/product/update/${id}`, payload)
    return await response.data
}

export const deleteProduct = async(id : number) => {
    const response = await api.delete(`/api/product/delete/${id}`)
    return await response.data
}

export const getAllProductsOnce = async()=>{
    const response = await api.get(`/api/product/allOnce`)
    return response.data
}

export const getProductBySearch =async(search : string)=>{
    const response = await api.get(`/api/product/search?search=${search}`)
    return await response.data
}

//Warehouse Routes
export const addWarehouse = async(payload : {})=>{
    const response = await api.post(`/api/warehouse/new`, payload)
    return await response.data
}


export const getAllWarehouse = async()=>{
    const response = await api.get(`/api/warehouse/all`)
    return response.data
}

export const getWarehouseById = async(id : number)=>{
    const response = await api.get(`/api/warehouse/${id}`)
    return response.data
}

export const editWarehouse = async(payload : {}, id : number)=>{
    const response = await api.put(`/api/warehouse/update/${id}`, payload)
    return await response.data
}

//Stock Routes
export const addStock = async(payload : {})=>{
    const response = await api.post(`/api/stock/new`, payload)
    return await response.data
}

export const getWarehouseStock =async(id : number)=>{
    const response = await api.get(`/api/stock/warehouse/${id}`)
    return await response.data
}

export const editStock = async(payload : {}, id : number)=>{
    const response = await api.put(`/api/stock/update/${id}`, payload)
    return await response.data
}

export const getStockMovementHistory =async(id : number)=>{
    const response = await api.get(`/api/stock/warehouse/stockmovement/${id}`)
    return await response.data
}
export const getAllWarehouseStock =async()=>{
    const response = await api.get(`/api/stock/allwarehouse`)
    return await response.data
}
export const getStockMovementLast7days =async()=>{
    const response = await api.get(`/api/stock/warehouse/movement/stockmovementlast7days`)
    return await response.data
}

//Notification route
export const getAllNotification = async()=>{
    const response = await api.get(`/api/notifications`)
    return await response.data
}

export const makeSingleRead = async(id : number)=>{
    const response = await api.put(`/api/notification/isread/${id}`)
    return await response.data
}

export const makeAllRead = async()=>{
    const response = await api.put(`/api/notification/isreadall`)
    return await response.data
}

export const getDashboardstats = async()=>{
    const response = await api.get(`/api/getDashboardstats`)
    return await response.data
}