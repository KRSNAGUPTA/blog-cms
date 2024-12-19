import editorReq from "../models/editorReqModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const changeRole = async (req, res) => {
  try {
    const { username, role } = req.body;
    if (!username || !role) {
      console.error("Change Role : username or role is not provided");
      return res
        .status(400)
        .json({ message: "username or role is not provided" });
    }
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
      totalUsers: users.length,
      userList: users,
      totalPosts: posts.length,
      postList: posts,
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
const bloggerRequest = async (req, res) => {
  try {
    const requests = await editorReq.find();
    if (!requests) {
      res.send(400).json({
        message: "Currently No request is there",
      });
    }
    res.status(200).json({
      message:"Fetched All request",
      requests
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { changeRole, getWebsiteStats, bloggerRequest };
