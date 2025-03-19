require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport"); // Import Passport
const mongoose = require("mongoose");
const User = require("./models/User");
const Song = require("./models/Song");
const Playlist = require("./models/Playlist");
const authRoutes = require("./routes/auth");

// Cấu hình Passport
require("./config/passport")(passport);

const app = express();

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.use("/auth", authRoutes); // Đăng ký route

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Music Streaming API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
