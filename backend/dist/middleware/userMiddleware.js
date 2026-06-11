import jwt from 'jsonwebtoken';
export const userAuth = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'Not authorized login again'
        });
    }
    const jwtsecret = process.env.JWT_SECRET;
    if (!jwtsecret) {
        return res.status(500).json({
            success: false,
            message: "JWT secret is not configured",
        });
    }
    try {
        const decoded = jwt.verify(token, jwtsecret);
        if (decoded.id && decoded.role) {
            req.user = {
                userId: decoded.id,
                userRole: decoded.role
            };
        }
        else {
            return res.json({
                success: false,
                message: 'Not Authorized Login Again'
            });
        }
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};
//# sourceMappingURL=userMiddleware.js.map