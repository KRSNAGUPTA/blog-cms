import { Router } from "express";
import { changeRole, getWebsiteStats, bloggerRequest, deleteUser } from "../controllers/adminController.js";
import {  rejectUpgrade, upgradeToEditor } from "../controllers/userController.js";

const router = Router();

router.patch("/updateRole", changeRole);
router.get("/request" , bloggerRequest)
router.post("/upgrade-accept", upgradeToEditor);
router.post("/upgrade-reject" , rejectUpgrade)
router.get("/webStatus",  getWebsiteStats);
router.delete("/delete-user", deleteUser);
export default router;
