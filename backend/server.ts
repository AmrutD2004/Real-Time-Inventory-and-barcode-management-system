import { check } from './database/check.ts';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app, { allowedOrigins } from './app.ts';
import { setSocketServer } from './utils/realtime.ts';

const PORT = process.env.PORT || 8080;
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors : {
        origin : allowedOrigins,
        methods : ['GET', 'POST']
    }
})
setSocketServer(io);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    // join a warehouse room
    socket.on('join_warehouse', (warehouseId: string) => {
        socket.join(`warehouse_${warehouseId}`)
        console.log(`Socket ${socket.id} joined warehouse_${warehouseId}`)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
    })
})

check().then(()=>{
httpServer.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
})
