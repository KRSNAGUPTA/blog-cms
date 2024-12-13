import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorUsername: { type: String },
    tags: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ["draft", "publish", "archive"],
      default: "draft",
    },
    coverImage: { type: String },
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    dislikes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    likesCount: { type: Number, default: 0 }, 
    dislikesCount: { type: Number, default: 0 },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
