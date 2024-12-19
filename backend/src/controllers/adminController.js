import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const changeRole = async (req, res) => {
  try {
    const { username, role } = req.body;
    const user = await User.findOne({
      username: username,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validRole = ["reader", "admin", "editor"].includes(role);
    if (!validRole) {
      return res.status(400).json({ message: "Invalid role" });
    }
    console.log(user);
    user.role = role;
    await user.save();
    res.status(200).json({ message: "Role changed successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getWebsiteStats = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Fetch all users excluding passwords
    const posts = await Post.find(); // Fetch all posts

    const websiteStats = {
      totalUsers: users.length, // Total number of users
      userList: users, // All user data
      totalPosts: posts.length, // Total number of posts
      postList: posts, // All post data
    };

    res.status(200).json({
      message: "Fetched all website data successfully",
      websiteStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export { changeRole, getWebsiteStats };
