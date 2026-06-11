import { Router } from "express";
import { upload } from "../utils/cloudinaryHelper.js";
import { userAuth } from "../middleware/userMiddleware.js";
import { addProduct, deleteProduct, editProduct, getAllProducts, getAllProductsOnce, getProductBySearch } from "../controller/productController.js";
const productsRoute = Router();
productsRoute.post('/product/new', userAuth, upload.single('productimage'), addProduct);
productsRoute.get('/product/all', userAuth, getAllProducts);
productsRoute.put('/product/update/:id', userAuth, editProduct);
productsRoute.delete('/product/delete/:id', userAuth, deleteProduct);
productsRoute.get('/product/allOnce', userAuth, getAllProductsOnce);
productsRoute.get('/product/search', userAuth, getProductBySearch);
export default productsRoute;
//# sourceMappingURL=products.js.map