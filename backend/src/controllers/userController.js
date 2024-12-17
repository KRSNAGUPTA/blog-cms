import User from "../models/userModel.js";
import ReqEditor from "../models/editorReqModel.js";
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(403).json({
        message: "User not found",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const upgradeToEditor = async (req, res) => {
  try {
    const { id } = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(401).json({
        message: "User not found",
      });
    }
    user.role = "editor";
    await User.save();
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const reqEditor = async (req, res) => {
  try {
    const { username, id } = req.user;

    if (!username || !id) {
      return res.status(400).json({
        message: "User information is incomplete",
      });
    }

    // Check if a request already exists
    const alreadyRequested = await ReqEditor.findOne({ userId: id });
    if (alreadyRequested) {
      return res.status(409).json({
        message: "Request already sent!",
      });
    }

    // Create a new editor request
    const done = await ReqEditor.create({
      userId: id,
      username: username,
    });

    if (!done) {
      return res.status(400).json({
        message: "Failed to save request",
      });
    }

    return res.status(201).json({
      message: "Request sent successfully",
    });
  } catch (error) {
    console.error("Error in reqEditor:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export { getUsers, getUser, upgradeToEditor, reqEditor };
