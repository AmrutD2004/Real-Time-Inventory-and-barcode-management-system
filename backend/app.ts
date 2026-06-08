import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import route from "./routes/userRoutes.ts";
import categoryRoutes from "./routes/categories.ts";
import productsRoute from "./routes/products.ts";
import warehouseRoute from "./routes/warehouse.ts";
import stockRoutes from "./routes/stocks.ts";
import notificationRoute from "./routes/notification.ts";
import dashboardRoute from "./routes/dashboard.ts";

config();

const app = express();

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (_req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

app.use("/api", route);
app.use("/api", categoryRoutes);
app.use("/api", productsRoute);
app.use("/api", warehouseRoute);
app.use("/api", stockRoutes);
app.use("/api", notificationRoute);
app.use("/api", dashboardRoute);

export { allowedOrigins };
export default app;
