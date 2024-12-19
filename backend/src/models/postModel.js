import mongoose from "mongoose";
import slugify from "slugify";

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
    slug: { type: String, unique: true},
    tags: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ["draft", "publish", "archive"],
      default: "draft",
    },
    coverImage: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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

postSchema.pre("save", async function (next) {
  if (this.isModified("title") || this.isNew) {
    let slug = slugify(this.title, { lower: true, strict: true });

    const existingPost = await mongoose.models.Post.findOne({ slug });
    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }
    this.slug = slug;
  }
  next();
});

export default mongoose.model("Post", postSchema);
