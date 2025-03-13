const mongoose = require("mongoose");
// How to create a model
// Bước 1: Require mongoose
// Bước 2: Tạo lược đồ mongoose (cấu trúc của một danh sách phát)
// Bước 3: Tạo model

const Playlist = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  // 1. Which songs are in the playlist
  // 2. Playlist collaborators
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
    },
  ],
  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const PlaylistModel = mongoose.model("Playlist", Playlist);

module.exports = PlaylistModel;
