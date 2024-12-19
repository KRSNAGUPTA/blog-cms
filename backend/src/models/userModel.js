import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "editor", "reader"],
      default: "reader",
    },
    avatar: {
      type: String,
      default:
        "https://img3.thuthuatphanmem.vn/uploads/2019/10/10/anh-avatar-doremon_033145784.png",
    },
    totalPosts: {
      type: Number,
      default: 0,
    },
    accessToken: {
      type: String,
    },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
