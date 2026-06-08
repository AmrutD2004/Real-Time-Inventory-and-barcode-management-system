import { Router } from "express";
import { userAuth } from "../middleware/userMiddleware.ts";
import { addWarehouse, editWarehouse, getAllWarehouse, getWarehouseById } from "../controller/warehouseController.ts";

const warehouseRoute = Router()

warehouseRoute.post('/warehouse/new', userAuth, addWarehouse);
warehouseRoute.get('/warehouse/all', userAuth, getAllWarehouse);
warehouseRoute.get('/warehouse/:id', userAuth, getWarehouseById);
warehouseRoute.put('/warehouse/update/:id', userAuth, editWarehouse);
export default warehouseRoute;