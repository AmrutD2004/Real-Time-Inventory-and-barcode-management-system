import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { check } from './database/check.js';
import route from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import categoryRoutes from './routes/categories.js';
import productsRoute from './routes/products.js';
import warehouseRoute from './routes/warehouse.js';
import stockRoutes from './routes/stocks.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import notificationRoute from './routes/notification.js';
import dashboardRoute from './routes/dashboard.js';
config();
const PORT = process.env.PORT;
const app = express();
const httpServer = createServer(app);
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173',];
const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST']
    }
});
app.use(cors({ origin: allowedOrigins, credentials: true }));
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    // join a warehouse room
    socket.on('join_warehouse', (warehouseId) => {
        socket.join(`warehouse_${warehouseId}`);
        console.log(`Socket ${socket.id} joined warehouse_${warehouseId}`);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
export { io };
//ALL ROUTES
app.use('/api', route);
app.use('/api', categoryRoutes);
app.use('/api', productsRoute);
app.use('/api', warehouseRoute);
app.use('/api', stockRoutes);
app.use('/api', notificationRoute);
app.use('/api', dashboardRoute);
check().then(() => {
    httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
//# sourceMappingURL=server.js.map