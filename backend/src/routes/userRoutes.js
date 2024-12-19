import { Router } from "express";
import {getUser, getUserByUsername, reqEditor, } from "../controllers/userController.js"
import authorizeRole from "../middlewares/roalMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();
router.get("/getuser",authMiddleware, getUser);
router.get("/u/:username", getUserByUsername);
router.post("/reqtoedit",authMiddleware, reqEditor )
export default router;