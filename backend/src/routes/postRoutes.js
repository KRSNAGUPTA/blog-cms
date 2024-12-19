import { Router } from "express";
import {
  getAllPosts,
  getPostBySlug, 
  deletePost,
  updatePost,
  createPost,
  getUserPosts,
  likePost,
  dislikePost,
  commentOnPost,
  modifyComment,
  deleteComment,
} from "../controllers/postController.js";
import authorizeRole from "../middlewares/roalMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/u/:username", getUserPosts); 

router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);
router.post("/", authMiddleware, authorizeRole("admin", "editor"), createPost);
router.patch("/:slug", authMiddleware, authorizeRole("admin", "editor"), updatePost);
router.delete("/:slug", authMiddleware, authorizeRole("admin", "editor"), deletePost);

router.post("/:slug/like", authMiddleware, likePost); 
router.post("/:slug/dislike", authMiddleware, dislikePost);
router.post("/:slug/comment", authMiddleware, commentOnPost);
router.patch("/:slug/comment/:commentId", authMiddleware, modifyComment); 
router.delete("/:slug/comment/:commentId", authMiddleware, deleteComment); 

export default router;
