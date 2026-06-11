import { prisma } from "../prisma/lib/prisma.js";
export const getDashboardStats = async (req, res) => {
    const { userId, userRole } = req.user;
    if (!userId || !userRole) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        });
    }
    const role = userRole;
    if (role !== 'Admin' && role !== 'Manager') {
        return res.status(403).json({
            success: false,
            message: `Access denied for ${role}`
        });
    }
    try {
        const [totalProduct, totalWarehouse, lowStockItems, TotalStockUnits] = await Promise.all([
            prisma.products.count(),
            prisma.warehouses.count(),
            prisma.stock.count({
                where: { quantity: { lt: prisma.stock.fields.low_stock_threshold } }
            }),
            prisma.stock.aggregate({
                _sum: { quantity: true }
            })
        ]);
        return res.status(200).json({
            success: true,
            data: {
                totalProduct, totalWarehouse, lowStockItems, TotalStockUnits
            }
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error",
            err: err
        });
    }
};
//# sourceMappingURL=dashboardController.js.map