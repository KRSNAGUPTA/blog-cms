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

export { changeRole };
