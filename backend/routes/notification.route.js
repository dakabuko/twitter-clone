import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  deleleNotification,
  deleteNotifications,
  getNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
router.delete("/:id", protectRoute, deleleNotification);

export default router;
