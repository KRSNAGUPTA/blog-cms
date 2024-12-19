import User from "../models/userModel.js";
import ReqEditor from "../models/editorReqModel.js";
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req?.user?.id;

    if (!id) {
      return res.status(400).json({
        message: "Id not provided",
      });
    }

    console.log(`[getUser] Received request with id: ${id}`);

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(`[getUser] Error: ${error.message}`);
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
    console.error(error);
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

    const result = await ReqEditor.findOneAndUpdate(
      { userId: id },
      { $setOnInsert: { userId: id, username } },
      { upsert: true, new: false }
    );

    if (result) {
      return res.status(409).json({
        message: "Request already sent!",
      });
    }

    return res.status(201).json({
      message: "Request sent successfully",
    });
  } catch (error) {
    console.error("Error in reqEditor:", error.message);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({
      username: username,
    }).select("-password -updatedAt -v");
    res.status(200).json({
      message: "Details fetched",
      user,
    });
  } catch (error) {
    console.error("Error in reqEditor:", error.message);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export { getUsers, getUser, upgradeToEditor, reqEditor, getUserByUsername };
