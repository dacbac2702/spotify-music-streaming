const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Ẩn password khi query
  avatar: { type: String, default: "" }, // URL ảnh đại diện
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Phân quyền
  likedSongs: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Song", default: [] },
  ],
  playlists: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Playlist", default: [] },
  ],
  createdAt: { type: Date, default: Date.now },
});

// Tạo Model từ Schema
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
