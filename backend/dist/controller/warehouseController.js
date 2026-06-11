import { prisma } from "../prisma/lib/prisma.js";
export const addWarehouse = async (req, res) => {
    const { userId, userRole } = req.user;
    const { warehouseName, warehouseLocation, warehouseRackInfo, warehouseCapacity } = req.body;
    if (!userId || !userRole) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        });
    }
    if (!warehouseName || !warehouseLocation) {
        return res.status(400).json({
            success: false,
            message: 'Both fields are required'
        });
    }
    try {
        const role = userRole;
        if (role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: `Access denied for ${role}`
            });
        }
        const data = await prisma.warehouses.create({
            data: {
                warehouseName: warehouseName,
                warehouseLocation: warehouseLocation,
                warehouseRackInfo: warehouseRackInfo || null,
                warehouseCapacity: warehouseCapacity || null,
                warehouseStatus: 'Active'
            }
        });
        return res.status(201).json({
            success: true,
            message: `Warehouse ${data.warehouseName} added successfully`
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
export const getAllWarehouse = async (req, res) => {
    const { userId, userRole } = req.user;
    if (!userId || !userRole) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        });
    }
    try {
        const role = userRole;
        if (role !== 'Admin' && role !== 'Manager') {
            return res.status(403).json({
                success: false,
                message: `Access denied for ${role}`
            });
        }
        const data = await prisma.warehouses.findMany();
        return res.status(200).json({
            success: true,
            data: data
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
export const getWarehouseById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(401).json({
            success: false,
            message: 'Warehouse Id required'
        });
    }
    const { userId, userRole } = req.user;
    if (!userId || !userRole) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        });
    }
    try {
        const role = userRole;
        if (role !== 'Admin' && role !== 'Manager') {
            return res.status(403).json({
                success: false,
                message: `Access denied for ${role}`
            });
        }
        const data = await prisma.warehouses.findUnique({
            where: { id: Number(id) }
        });
        return res.status(200).json({
            success: true,
            data: data
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
export const editWarehouse = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(401).json({
            success: false,
            message: 'Warehouse Id required'
        });
    }
    const { userId, userRole } = req.user;
    const { warehouseName, warehouseLocation, warehouseRackInfo, warehouseCapacity, warehouseStatus } = req.body;
    if (!userId || !userRole) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        });
    }
    if (!warehouseName || !warehouseLocation) {
        return res.status(400).json({
            success: false,
            message: 'Both fields are required'
        });
    }
    try {
        const role = userRole;
        if (role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: `Access denied for ${role}`
            });
        }
        const data = await prisma.warehouses.update({
            data: {
                warehouseName: warehouseName,
                warehouseLocation: warehouseLocation,
                warehouseRackInfo: warehouseRackInfo || null,
                warehouseCapacity: warehouseCapacity,
                warehouseStatus: warehouseStatus
            },
            where: { id: Number(id) }
        });
        return res.status(201).json({
            success: true,
            message: `Warehouse ${data.warehouseName} updated successfully`
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
//# sourceMappingURL=warehouseController.js.map