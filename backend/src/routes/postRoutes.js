import { Router } from "express";
import {
  getAllPosts,
  getPostById,
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

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, authorizeRole("admin", "editor"), createPost);
router.patch(
  "/:id",
  authMiddleware,
  authorizeRole("admin", "editor"),
  updatePost
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRole("admin", "editor"),
  deletePost
);
router.patch("/:id/like", authMiddleware, likePost);
router.patch("/:id/dislike", authMiddleware, dislikePost);
router.patch("/:id/comment", authMiddleware, commentOnPost);
router.patch("/:id/modifyComment", authMiddleware, modifyComment);
router.delete("/:id/deleteComment", authMiddleware, deleteComment);

router.get("/user/:username", getUserPosts);

export default router;
