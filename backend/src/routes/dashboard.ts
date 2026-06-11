import { Router } from "express";
import { userAuth } from "../middleware/userMiddleware.js";
import { getDashboardStats } from "../controller/dashboardController.js";

const dashboardRoute = Router();

dashboardRoute.get('/getDashboardstats', userAuth, getDashboardStats)
export default dashboardRoute;