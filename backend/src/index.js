import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import authorizeRole from "./middlewares/roalMiddleware.js";
dotenv.config();

const app = express();

connectDB();

app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("API is running....");
});

app.get("/api/auth/status", (req, res) => {
  res.send("API for Auth is running....");
});
app.use("/api/auth", authRoutes);

app.get("/api/user/status", (req, res) => {
  res.send("API for User is running....");
});
app.use("/api/user",authMiddleware,  userRoutes);

app.get(
  "/api/admin/status",
  authMiddleware,
  authorizeRole("admin"),
  (req, res) => {
    res.send("API for Admin is running....");
  }
);
app.use("/api/admin", authMiddleware, authorizeRole("admin"), adminRoutes);

app.get("/api/posts/status", (req, res) => {
  res.send("API for Posts is running....");
});
app.use("/api/posts", postRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port} \nhttp://localhost:${port}`);
});
