const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// POST /auth/login - Đăng nhập và nhận JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem user có tồn tại không
    const user = await User.findOne({ email });
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

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
