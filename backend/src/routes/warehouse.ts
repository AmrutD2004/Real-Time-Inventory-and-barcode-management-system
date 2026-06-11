import { Router } from "express";
import { userAuth } from "../middleware/userMiddleware.js";
import { addWarehouse, editWarehouse, getAllWarehouse, getWarehouseById } from "../controller/warehouseController.js";

const warehouseRoute = Router()

warehouseRoute.post('/warehouse/new', userAuth, addWarehouse);
warehouseRoute.get('/warehouse/all', userAuth, getAllWarehouse);
warehouseRoute.get('/warehouse/:id', userAuth, getWarehouseById);
warehouseRoute.put('/warehouse/update/:id', userAuth, editWarehouse);
export default warehouseRoute;