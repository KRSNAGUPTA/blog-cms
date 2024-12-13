import { Router } from "express";
import { changeRole } from "../controllers/adminController.js";

const router = Router();

router.patch("/updateRole", changeRole);
export default router;
