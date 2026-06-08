import { Router } from "express";
import { upload } from "../utils/cloudinaryHelper.ts";
import { userAuth } from "../middleware/userMiddleware.ts";
import { addProduct, deleteProduct, editProduct, getAllProducts, getAllProductsOnce, getProductBySearch } from "../controller/productController.ts";

const productsRoute = Router();

productsRoute.post('/product/new', userAuth, upload.single('productimage'),   addProduct)
productsRoute.get('/product/all', userAuth,  getAllProducts)
productsRoute.put('/product/update/:id', userAuth, editProduct)
productsRoute.delete('/product/delete/:id', userAuth, deleteProduct)
productsRoute.get('/product/allOnce', userAuth,  getAllProductsOnce)
productsRoute.get('/product/search', userAuth,  getProductBySearch)

export default productsRoute