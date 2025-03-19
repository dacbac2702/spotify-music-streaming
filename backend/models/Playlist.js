const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người tạo playlist
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }], // Danh sách bài hát trong playlist
  coverImage: { type: String }, // Ảnh đại diện playlist
  isPublic: { type: Boolean, default: false }, // Playlist công khai hoặc riêng tư
  createdAt: { type: Date, default: Date.now },
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;
