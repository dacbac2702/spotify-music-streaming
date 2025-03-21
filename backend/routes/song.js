const express = require("express");
const fs = require("fs");
const path = require("path");
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

// API Lấy Danh Sách Bài Hát
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find().populate("artist album");
    return res.status(200).json(songs);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài hát:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

// API Lấy Bài Hát Theo ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID bài hát không hợp lệ" });
    }

    // Tìm bài hát theo ID
    const song = await Song.findById(id).populate("artist album");
    if (!song) {
      return res.status(404).json({ error: "Không tìm thấy bài hát" });
    }

    return res.status(200).json(song);
  } catch (error) {
    console.error("Lỗi khi lấy bài hát:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

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

// Cập nhật thông tin bài hát (Chỉ Admin)
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, artist, album, genre, duration, url, coverImage } =
        req.body;

      // Kiểm tra xem user có phải admin không
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ error: "Bạn không có quyền chỉnh sửa bài hát này" });
      }

      // Kiểm tra ID hợp lệ
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Song ID không hợp lệ" });
      }

      // Tìm bài hát theo ID
      let song = await Song.findById(id);
      if (!song) {
        return res.status(404).json({ error: "Không tìm thấy bài hát" });
      }

      // Cập nhật bài hát
      song.title = title || song.title;
      song.artist = artist || song.artist;
      song.album = album || song.album;
      song.url = url || song.url;
      song.coverImage = coverImage || song.coverImage;

      await song.save();

      return res
        .status(200)
        .json({ message: "Bài hát đã được cập nhật!", song });
    } catch (error) {
      console.error("Lỗi khi cập nhật bài hát:", error);
      return res.status(500).json({ error: "Lỗi server" });
    }
  }
);

// Xóa bài hát (Chỉ Admin)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Kiểm tra quyền admin
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ error: "Bạn không có quyền xóa bài hát này" });
      }

      // Kiểm tra ID hợp lệ
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Song ID không hợp lệ" });
      }

      // Tìm bài hát theo ID
      const song = await Song.findById(id);
      if (!song) {
        return res.status(404).json({ error: "Không tìm thấy bài hát" });
      }

      // Xóa bài hát
      await Song.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ message: "Bài hát đã được xóa thành công" });
    } catch (error) {
      console.error("Lỗi khi xóa bài hát:", error);
      return res.status(500).json({ error: "Lỗi server" });
    }
  }
);

// API Streaming Nhạc từ Cloudinary
router.get("/stream/:songId", async (req, res) => {
  try {
    const { songId } = req.params;

    // Tìm bài hát theo ID
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ error: "Không tìm thấy bài hát" });
    }

    // Kiểm tra xem URL có tồn tại không
    if (!song.url) {
      return res.status(400).json({ error: "Bài hát không có URL hợp lệ" });
    }

    // Trả về URL trực tiếp để client phát nhạc
    return res.status(200).json({ streamUrl: song.url });
  } catch (error) {
    console.error("Lỗi khi phát nhạc:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
