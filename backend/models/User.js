const mongoose = require("mongoose");
//How to create a model
//Bước 1: Require mongoose
//Bước 2: Tạo lược đồ mongoose (cấu trúc của một người dùng)
//Bước 3: Tạo model

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  likedSongs: {
    // We will change this to array later
    type: String,
    default: "",
  },
  likedPlaylists: {
    // We will change this to array later
    type: String,
    default: "",
  },
  subscribedArtists: {
    // We will change this to array later
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
