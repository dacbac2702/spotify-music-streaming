const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// POST /auth/register - Đăng ký người dùng mới
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Kiểm tra xem email hoặc username đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email này đã tồn tại" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username này đã được sử dụng" });
    }

    // Hash mật khẩu trước khi lưu vào database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Tạo JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(201)
      .json({ message: "Đăng ký thành công!", user: newUser, token });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

// POST /auth/login - Đăng nhập và nhận JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem user có tồn tại không
    const user = await User.findOne({ email }).select("+password"); // Bắt buộc lấy password
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Sai mật khẩu" });
    }

    // Tạo JWT token
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar || `https://i.pravatar.cc/150?u=${user._id}`,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
