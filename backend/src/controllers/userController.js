import User from "../models/userModel.js";
import Post from "../models/postModel.js";
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
    const { username } = req.body;
    const user = await User.findOne({
      username: username,
    });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    user.role = "editor";
    await user.save();
    const isDeleted = await ReqEditor.findOneAndDelete({
      username: username,
    });
    if (!isDeleted) {
      return res.status(400).json({
        message: "Failed to reject",
      });
    }
    return res.status(200).json({
      message: "Role changed to editor",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const rejectUpgrade = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    console.log(`Got username ${username} & ${user}`);

    const deletedRequest = await ReqEditor.findOneAndDelete({
      username: username,
    });

    if (!deletedRequest) {
      return res.status(400).json({
        message: "Failed to reject",
      });
    }

    return res.status(200).json({
      message: "Request is rejected successfully",
    });
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
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "No user found",
      });
    }

    const result = await ReqEditor.findOneAndUpdate(
      { userId: id },
      { $setOnInsert: { userId: id, username, email: user.email } },
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
    if (!user) {
      console.log(`userByUsername: ${username} not found`);
      return res.status(403).json({
        message: "User not found",
      });
      XMLDocument;
    }
    console.log(`Got user details with username : ${user}`);
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
const handleSearch = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    if (!searchTerm) {
      return res.status(400).json({
        message: "No search term found",
      });
    }
    const user = await User.find({
      username: searchTerm,
    });

    const post = await Post.s;
  } catch (error) {
    console.error("Error in reqEditor:", error.message);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export {
  getUsers,
  getUser,
  upgradeToEditor,
  reqEditor,
  getUserByUsername,
  rejectUpgrade,
  handleSearch,
};
