import type { Server } from "socket.io";

let io: Server | null = null;

export const setSocketServer = (server: Server) => {
  io = server;
};

export const emitNotification = (payload: { type: string; message: string }) => {
  io?.emit("new_notification", payload);
};

export const emitWarehouseStockUpdated = (
  warehouseId: number,
  payload: {
    stockId: number;
    productId: number;
    productName?: string;
    warehouseId: number;
    newQuantity: number;
    type: "IN" | "OUT";
    difference: number;
  }
) => {
  io?.to(`warehouse_${warehouseId}`).emit("stock_updated", payload);
};
