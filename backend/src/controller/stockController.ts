import type { Request, Response } from "express";
import { prisma } from "../prisma/lib/prisma.js";
import { io } from "../server.js";

export const addStock = async (req: Request, res: Response) => {
    const { userId, userRole } = req.user;
    const { product_id, quantity, low_stock_threshold, warehouse_id } = req.body;
    if (!userId || !userRole) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        })
    }
    if (!product_id || !quantity || !low_stock_threshold || !warehouse_id) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required!'
        })
    }
    const role = userRole
    if (role !== 'Admin' && role !== 'Manager') {
        return res.status(403).json({
            success: false,
            message: `Access denied for ${role}`
        })
    }
    try {
        const data = await prisma.stock.create({
            data: {
                product_id: product_id,
                warehouse_id: warehouse_id,
                low_stock_threshold: low_stock_threshold,
                quantity: quantity
            }
        })
        return res.status(201).json({
            success: true,
            message: `Stock Assigned`
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }

}

export const getWarehouseStock = async (req: Request, res: Response) => {
    const { userId, userRole } = req.user;
    const { id } = req.params;
    if (!userId || !userRole) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        })
    }
    const role = userRole
    if (role !== 'Admin' && role !== 'Manager') {
        return res.status(403).json({
            success: false,
            message: `Access denied for ${role}`
        })
    }
    try {
        const data = await prisma.stock.findMany({
            where: {
                warehouse_id: Number(id),
            },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        return res.status(200).json({
            success: true,
            data: data
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: `Server error ${err}`
        })
    }
}

export const editStock = async (req: Request, res: Response) => {
    const { userId, userRole } = req.user;
    const { quantity, note, low_stock_threshold, prevQuantity } = req.body;
    const { id } = req.params;

    if (!userId || !userRole) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        })
    }

    const role = userRole
    if (role !== 'Admin' && role !== 'Manager') {
        return res.status(403).json({
            success: false,
            message: `Access denied for ${role}`
        })
    }

    try {
        // 1. get current FIRST before any update
        const current = await prisma.stock.findUnique({
            where: { id: Number(id) },
            include: {
                product: true,
                warehouse: true
            }
        })

        if (!current) {
            return res.status(404).json({
                success: false,
                message: `Stock with id ${id} not found`
            })
        }

        // 2. calculate difference BEFORE updating
        const difference = Number(quantity) - prevQuantity
        if (difference === 0) {
            await prisma.stock.update({
                where: { id: Number(id) },
                data: {
                    low_stock_threshold: Number(low_stock_threshold)
                }
            })
            return res.status(201).json({
                success: true,
                message: 'Stock Threshold updated successfully '
            })
        }
        // 3. now update + create movement together
        await prisma.$transaction([
            prisma.stock.update({
                where: { id: Number(id) },
                data: {
                    quantity: Number(quantity),
                    low_stock_threshold: Number(low_stock_threshold)
                }
            }),
            prisma.stockMovement.create({
                data: {
                    product_id: current.product_id,
                    warehouse_id: current.warehouse_id,
                    preformed_by: Number(userId),
                    type: difference > 0 ? 'IN' : 'OUT',
                    quantity: Math.abs(difference),
                    note: note || null
                }
            })
        ])
        const updatedStock = await prisma.stock.findUnique({
            where: { id: Number(id) },
            include: {
                product: true,
                warehouse: true
            }
        })
        if (!updatedStock) return
        const adminAndManager = await prisma.users.findMany({
            where: { role: { in: ['Admin', 'Manager'] } }
        })
        await prisma.notification.createMany({
            data: adminAndManager.map(user => ({
                user_id: user.id,
                type: 'STOCK_UPDATED',
                message: `${updatedStock.product.name} in ${updatedStock.warehouse.warehouseName} — ${difference > 0 ? 'IN' : 'OUT'} ${Math.abs(difference)} units. New quantity: ${updatedStock.quantity}`,
                isRead: false
            }))
        })
        io.emit('new_notification', {
            type: 'STOCK_UPDATED',
            message: `${updatedStock.product.name} — ${difference > 0 ? 'IN' : 'OUT'} ${Math.abs(difference)} units`
        })
        if (updatedStock && updatedStock.quantity < updatedStock.low_stock_threshold) {
            await prisma.notification.createMany({
                data: adminAndManager.map(user => ({
                    user_id: user.id,
                    type: 'LOW_STOCK',
                    message: `Low stock alert! ${updatedStock.product.name} in ${updatedStock.warehouse.warehouseName} has only ${updatedStock.quantity} units left.`,
                    isRead: false
                }))
            })
            io.emit('new_notification', {
                type: 'LOW_STOCK',
                message: `Low stock: ${updatedStock.product.name} — ${updatedStock.quantity} units left`
            })
        }
        io.to(`warehouse_${current.warehouse_id}`).emit('stock_updated', {
            stockId: Number(id),
            productId: current.product_id,
            productName: current.product?.name,
            warehouseId: current.warehouse_id,
            newQuantity: Number(quantity),
            type: difference > 0 ? 'IN' : 'OUT',
            difference: Math.abs(difference)
        })

        return res.status(200).json({
            success: true,
            message: `${current.product?.name} in ${current.warehouse?.warehouseName} updated successfully`
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Server error",
            err: err
        })
    }
}


export const getStockMovementHistory = async (req: Request, res: Response) => {
    const { userId, userRole } = req.user;
    const { id } = req.params;

    if (!userId || !userRole) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        })
    }

    const role = userRole
    if (role !== 'Admin' && role !== 'Manager') {
        return res.status(403).json({
            success: false,
            message: `Access denied for ${role}`
        })
    }

    try {
        const data = await prisma.stockMovement.findMany({
            where: { warehouse_id: Number(id) },
            orderBy: {
                created_at: 'desc'
            },
            include: {
                product: true,
                user: true
            }
        })
        return res.status(200).json({
            success: true,
            data: data
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Server error",
            err: err
        })
    }
}

export const getAllWarehouseStock = async (req: Request, res: Response) => {
    const { userId, userRole } = req.user;
    const { id } = req.params;
    if (!userId || !userRole) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        })
    }
    const role = userRole
    if (role !== 'Admin' && role !== 'Manager') {
        return res.status(403).json({
            success: false,
            message: `Access denied for ${role}`
        })
    }
    try {
        const data = await prisma.stock.findMany({
            include: {
                warehouse: true,
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        return res.status(200).json({
            success: true,
            data: data
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: `Server error ${err}`
        })
    }
}

export const getStockMovementLast7days = async (req: Request, res: Response) => {
    const { userId, userRole } = req.user;

    if (!userId || !userRole) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        })
    }

    const role = userRole
    if (role !== 'Admin' && role !== 'Manager') {
        return res.status(403).json({
            success: false,
            message: `Access denied for ${role}`
        })
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    try {
        const data = await prisma.stockMovement.findMany({
            where: { created_at: { gte: sevenDaysAgo } },
            orderBy: { created_at: 'asc' },
            select: {
                type: true,
                quantity: true,
                created_at: true
            }
        })

        // group by day on the backend
        const grouped: Record<string, { IN: number, OUT: number }> = {}

        data.forEach((movement) => {
            const day = new Date(movement.created_at).toLocaleDateString('en-IN', { weekday: 'short' })
            if (!grouped[day]) grouped[day] = { IN: 0, OUT: 0 }
            if (movement.type === 'IN') grouped[day].IN += movement.quantity
            if (movement.type === 'OUT') grouped[day].OUT += movement.quantity
        })

        return res.status(200).json({
            success: true,
            data: grouped
            // { "Mon": { IN: 45, OUT: 20 }, "Tue": { IN: 80, OUT: 35 } ... }
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Server error",
            err: err
        })
    }
}


