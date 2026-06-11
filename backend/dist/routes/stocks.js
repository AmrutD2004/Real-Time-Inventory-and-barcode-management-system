import { Router } from "express";
import { userAuth } from "../middleware/userMiddleware.js";
import { addStock, editStock, getAllWarehouseStock, getStockMovementHistory, getStockMovementLast7days, getWarehouseStock } from "../controller/stockController.js";
const stockRoutes = Router();
stockRoutes.post('/stock/new', userAuth, addStock);
stockRoutes.get('/stock/warehouse/:id', userAuth, getWarehouseStock);
stockRoutes.get('/stock/allwarehouse', userAuth, getAllWarehouseStock);
stockRoutes.put('/stock/update/:id', userAuth, editStock);
stockRoutes.get('/stock/warehouse/stockmovement/:id', userAuth, getStockMovementHistory);
stockRoutes.get('/stock/warehouse/movement/stockmovementlast7days', userAuth, getStockMovementLast7days);
export default stockRoutes;
//# sourceMappingURL=stocks.js.map