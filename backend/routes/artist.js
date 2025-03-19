const express = require("express");
const mongoose = require("mongoose");
const Artist = require("../models/Artist");
const passport = require("passport");
const router = express.Router();

// Tạo nghệ sĩ mới (Yêu cầu xác thực JWT)
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { name, bio, imageUrl } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Tên nghệ sĩ là bắt buộc" });
      }

      // Kiểm tra xem nghệ sĩ đã tồn tại chưa
      const existingArtist = await Artist.findOne({ name });
      if (existingArtist) {
        return res.status(400).json({ error: "Nghệ sĩ này đã tồn tại" });
      }

      const newArtist = new Artist({
        name,
        bio,
        imageUrl,
      });

      await newArtist.save();
      return res
        .status(201)
        .json({ message: "Nghệ sĩ đã được tạo!", artist: newArtist });
    } catch (error) {
      console.error("Lỗi khi tạo nghệ sĩ:", error);
      return res.status(500).json({ error: "Lỗi server" });
    }
  }
);

module.exports = router;
