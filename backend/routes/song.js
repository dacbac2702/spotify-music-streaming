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
      const { title, artist, album, url, coverImage } = req.body;
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

// GET /songs/my-songs - Lấy danh sách bài hát của user (Yêu cầu xác thực)
router.get(
  "/my-songs",
  passport.authenticate("jwt", { session: false }), // Xác thực bằng JWT
  async (req, res) => {
    try {
      const userId = req.user._id; // Lấy ID người đăng nhập từ token

      // Tìm tất cả bài hát do user này tải lên
      const songs = await Song.find({ uploadedBy: userId });

      return res.status(200).json(songs);
    } catch (error) {
      return res.status(500).json({ error: "Lỗi server" });
    }
  }
);

// GET /songs/search?artist=Ed Sheeran&title=Shape of You
router.get("/search", async (req, res) => {
  try {
    const { artist, title } = req.query;

    // Tạo điều kiện tìm kiếm động
    let query = {};
    if (artist) {
      query.artist = new RegExp(artist, "i"); // Tìm theo nghệ sĩ (không phân biệt hoa thường)
    }
    if (title) {
      query.title = new RegExp(title, "i"); // Tìm theo tên bài hát (không phân biệt hoa thường)
    }

    // Tìm kiếm trong MongoDB
    const songs = await Song.find(query).populate("artist album");

    return res.status(200).json(songs);
  } catch (error) {
    console.error("Lỗi khi tìm bài hát:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
