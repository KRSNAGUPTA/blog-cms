import { Router } from "express";
import {getUser, reqEditor, } from "../controllers/userController.js"
import authorizeRole from "../middlewares/roalMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();
router.get("/getuser", getUser);
router.post("/reqtoedit",authMiddleware, reqEditor )
export default router;