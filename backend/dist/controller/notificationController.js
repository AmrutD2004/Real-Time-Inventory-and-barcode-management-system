import { prisma } from "../prisma/lib/prisma.js";
export const getAllNotification = async (req, res) => {
    const { userId, userRole } = req.user;
    if (!userId || !userRole) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        });
    }
    try {
        const data = await prisma.notification.findMany({
            where: { user_id: Number(userId) },
            orderBy: {
                created_at: 'desc'
            },
            take: 20
        });
        const unreadCount = await prisma.notification.count({
            where: { user_id: Number(userId),
                isRead: false }
        });
        return res.status(200).json({
            success: true,
            data: data,
            unreadCount
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
export const makeSingleRead = async (req, res) => {
    const { userId, userRole } = req.user;
    const { id } = req.params;
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
        await prisma.notification.update({
            data: {
                isRead: true
            },
            where: { id: Number(id), user_id: Number(userId) }
        });
        return res.status(201).json({
            success: true
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
export const makeAllRead = async (req, res) => {
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
        await prisma.notification.updateMany({
            data: {
                isRead: true
            },
            where: { user_id: Number(userId) }
        });
        return res.status(201).json({
            success: true
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
//# sourceMappingURL=notificationController.js.map