import { Router } from "express";
import { changeRole, getWebsiteStats } from "../controllers/adminController.js";
import {  upgradeToEditor } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roalMiddleware.js";

const router = Router();

router.patch("/updateRole", changeRole);
router.post("/upgrade", authMiddleware, authorizeRole("admin"), upgradeToEditor);
router.get("/webStatus", authMiddleware, authorizeRole("admin"), getWebsiteStats);
export default router;
