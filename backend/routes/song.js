const express = require("express");
const mongoose = require("mongoose");
const Song = require("../models/Song"); // Import model bài hát
const passport = require("passport");
const router = express.Router();

// POST /songs/create - Tạo bài hát mới (Yêu cầu xác thực)
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }), // Bảo vệ route bằng JWT
  async (req, res) => {
    try {
      const { title, artist, album, url, coverImage } =
        req.body;
      const userId = req.user._id; // Lấy ID của người đăng nhập từ JWT

      // Kiểm tra xem đã đủ thông tin chưa
      if (!title || !artist || !url) {
        return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
      }

      // Tạo bài hát mới
      const newSong = new Song({
        title,
        artist,
        album,
        url,
        coverImage,
        uploadedBy: userId, // Lưu ID của người tải lên
      });

      // Lưu vào MongoDB
      await newSong.save();

      return res
        .status(201)
        .json({ message: "Bài hát đã được tạo!", song: newSong });
    } catch (error) {
      console.error("Lỗi khi tạo bài hát:", error);
      return res.status(500).json({ error: "Lỗi server" });
    }
  }
);

module.exports = router;
