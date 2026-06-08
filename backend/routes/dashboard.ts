import { Router } from "express";
import { userAuth } from "../middleware/userMiddleware.ts";
import { getDashboardStats } from "../controller/dashboardController.ts";

const dashboardRoute = Router();

dashboardRoute.get('/getDashboardstats', userAuth, getDashboardStats)
export default dashboardRoute;