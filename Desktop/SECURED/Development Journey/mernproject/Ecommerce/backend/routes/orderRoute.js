import express from "express";
import { deleteOrder, getAllOrders, getSingleOrder, myOrders, newOrder, updateOrder } from "../controllers/orderController.js";
import { isAuthenticated, authorizeRoles } from "../utils/auth.js";
const router = express.Router();

router.route("/order/new").post(isAuthenticated,newOrder);
router.route("/order/:id").get(isAuthenticated,getSingleOrder);
router.route("/orders/me").get(isAuthenticated,myOrders);
router.route("/admin/orders").get(isAuthenticated,authorizeRoles("admin"), getAllOrders);
router.route("/admin/orders/:id").put(isAuthenticated,authorizeRoles("admin"), updateOrder).delete(isAuthenticated,authorizeRoles("admin"),deleteOrder);

export default router;