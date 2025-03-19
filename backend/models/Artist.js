const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Tên nghệ sĩ (bắt buộc, không trùng lặp)
  bio: { type: String }, // Tiểu sử nghệ sĩ
  imageUrl: { type: String }, // Ảnh đại diện
  createdAt: { type: Date, default: Date.now },
});

const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;
