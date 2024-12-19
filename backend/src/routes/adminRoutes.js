import { Router } from "express";
import { changeRole, getWebsiteStats, bloggerRequest } from "../controllers/adminController.js";
import {  upgradeToEditor } from "../controllers/userController.js";

const router = Router();

router.patch("/updateRole", changeRole);
router.get("/request" , bloggerRequest)
router.post("/upgrade-accept", upgradeToEditor);
router.post("/upgrade-reject" , bloggerRequest)
router.get("/webStatus",  getWebsiteStats);
export default router;
