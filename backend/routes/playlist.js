const express = require("express");
const mongoose = require("mongoose");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const Artist = require("../models/Artist");
const passport = require("passport");
const router = express.Router();

// Tạo Playlist mới (Yêu cầu xác thực JWT)
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { name, songs, coverImage, isPublic } = req.body;
      const userId = req.user._id;

      if (!name) {
        return res.status(400).json({ error: "Tên playlist là bắt buộc" });
      }

      const newPlaylist = new Playlist({
        name,
        user: userId,
        songs: songs || [],
        coverImage,
        isPublic: isPublic || false,
      });

      await newPlaylist.save();
      return res
        .status(201)
        .json({ message: "Playlist đã được tạo!", playlist: newPlaylist });
    } catch (error) {
      console.error("Lỗi khi tạo playlist:", error);
      return res.status(500).json({ error: "Lỗi server" });
    }
  }
);

// Lấy danh sách Playlist của User (Yêu cầu xác thực JWT)
router.get(
  "/my-playlists",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user._id;
      console.log("User ID:", userId);

      const playlists = await Playlist.find({ user: userId }).populate("songs");
      return res.status(200).json(playlists);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách playlist:", error);
      return res.status(500).json({ error: "Lỗi server" });
    }
  }
);

// Lấy danh sách Playlist có bài hát của một nghệ sĩ cụ thể
router.get("/artist/:artistId", async (req, res) => {
  try {
    const { artistId } = req.params;

    // Kiểm tra xem artistId có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return res.status(400).json({ error: "Artist ID không hợp lệ" });
    }

    // Tìm tất cả bài hát của nghệ sĩ
    const artistSongs = await Song.find({ artist: artistId }).select("_id");
    const songIds = artistSongs.map((song) => song._id);

    // Tìm tất cả playlist có chứa bài hát của nghệ sĩ
    const playlists = await Playlist.find({ songs: { $in: songIds } }).populate(
      "user songs"
    );

    return res.status(200).json(playlists);
  } catch (error) {
    console.error("Lỗi khi lấy playlist cho nghệ sĩ:", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

// Thêm bài hát vào playlist (Yêu cầu xác thực JWT)
router.post(
  "/:playlistId/add-song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { playlistId } = req.params;
      const { songId } = req.body;
      const userId = req.user._id;

      // Kiểm tra ID hợp lệ
      if (
        !mongoose.Types.ObjectId.isValid(playlistId) ||
        !mongoose.Types.ObjectId.isValid(songId)
      ) {
        return res
          .status(400)
          .json({ error: "Playlist ID hoặc Song ID không hợp lệ" });
      }

      // Kiểm tra playlist có tồn tại không
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ error: "Playlist không tồn tại" });
      }

      // Kiểm tra quyền sở hữu playlist
      if (playlist.user.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ error: "Bạn không có quyền sửa playlist này" });
      }

      // Kiểm tra bài hát có tồn tại không
      const song = await Song.findById(songId);
      if (!song) {
        return res.status(404).json({ error: "Bài hát không tồn tại" });
      }

      // Kiểm tra bài hát đã có trong playlist chưa
      if (playlist.songs.includes(songId)) {
        return res.status(400).json({ error: "Bài hát đã có trong playlist" });
      }

      // Thêm bài hát vào playlist
      playlist.songs.push(songId);
      await playlist.save();

      return res
        .status(200)
        .json({ message: "Bài hát đã được thêm vào playlist", playlist });
    } catch (error) {
      console.error("Lỗi khi thêm bài hát vào playlist:", error);
      return res.status(500).json({ error: "Lỗi server" });
    }
  }
);

// Xóa bài hát khỏi playlist (Chỉ chủ sở hữu)
router.delete(
  "/:playlistId/remove-song/:songId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { playlistId, songId } = req.params;
      const userId = req.user._id;

      // Kiểm tra ID hợp lệ
      if (
        !mongoose.Types.ObjectId.isValid(playlistId) ||
        !mongoose.Types.ObjectId.isValid(songId)
      ) {
        return res
          .status(400)
          .json({ error: "Playlist ID hoặc Song ID không hợp lệ" });
      }

      // Tìm playlist trong database
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ error: "Playlist không tồn tại" });
      }

      // Kiểm tra quyền sở hữu playlist
      if (playlist.user.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ error: "Bạn không có quyền sửa playlist này" });
      }

      // Kiểm tra bài hát có trong playlist không
      if (!playlist.songs.includes(songId)) {
        return res
          .status(400)
          .json({ error: "Bài hát không có trong playlist" });
      }

      // Xóa bài hát khỏi danh sách songs
      playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);
      await playlist.save();

      return res
        .status(200)
        .json({ message: "Bài hát đã được xóa khỏi playlist", playlist });
    } catch (error) {
      console.error("Lỗi khi xóa bài hát khỏi playlist:", error);
      return res.status(500).json({ error: "Lỗi server" });
    }
  }
);

module.exports = router;
