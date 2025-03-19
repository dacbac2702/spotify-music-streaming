const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  album: { type: String },
  url: { type: String, required: true }, // Đường dẫn nhạc
  coverImage: { type: String }, // Ảnh bìa bài hát
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Ai tải lên bài hát
  createdAt: { type: Date, default: Date.now },
});

const Song = mongoose.model("Song", SongSchema);
module.exports = Song;
