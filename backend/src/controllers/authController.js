import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: "All details are required" });
    }

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
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!(email || username)) {
      return res.status(400).json({ message: "Email or username is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

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
        role: user.role,
        username: user.username,
      },
    };
    user.lastLogin = Date.now();
    await user.save();

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1d" }
    );

    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    res.status(200).cookie("accessToken", token, options).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .clearCookie("accessToken", options)
      .json({ message: "Logout successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while logout", error: error.message });
  }
};

export { signup, login, logout };
