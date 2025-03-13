const mongoose = require("mongoose");
// How to create a model
// Bước 1: Require mongoose
// Bước 2: Tạo lược đồ mongoose (cấu trúc của một bài hát)
// Bước 3: Tạo model

const Song = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  track: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const SongModel = mongoose.model("Song", Song);

module.exports = SongModel;
