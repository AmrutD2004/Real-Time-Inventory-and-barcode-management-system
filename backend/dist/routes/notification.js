import { Router } from "express";
import { userAuth } from "../middleware/userMiddleware.js";
import { getAllNotification, makeAllRead, makeSingleRead } from "../controller/notificationController.js";
const notificationRoute = Router();
notificationRoute.get('/notifications', userAuth, getAllNotification),
    notificationRoute.put('/notification/isread/:id', userAuth, makeSingleRead);
notificationRoute.put('/notification/isreadall/', userAuth, makeAllRead);
export default notificationRoute;
//# sourceMappingURL=notification.js.map