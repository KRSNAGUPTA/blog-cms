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
    const users = await User.find().select("-password");
    const posts = await Post.find();

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
      message: "Fetched All request",
      requests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    console.log("Got request");
    const { username } = req.body;
    console.log(`Username ${username}`);
    if (!username) {
      return res.status(400).json({
        message: "Username not provided",
      });
    }
    console.log(`Got username ${username}`);
    const deleted = await User.findOneAndDelete({ username:username });
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { changeRole, getWebsiteStats, bloggerRequest, deleteUser };
