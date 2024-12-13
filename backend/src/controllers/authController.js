import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (emailExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    if (usernameExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = new User({
      name,
      email,
      username,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
        role: user.role
      },
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "default_secret",
      {
        expiresIn: "1d",
      }
    );
    const option = {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    };

    res.status(200).cookie("accessToken", token).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const logout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true
    };
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({ message: "Logout successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while logout" });
  }
};

export { signup, login, logout };
