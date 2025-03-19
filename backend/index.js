require("dotenv").config();
require("./config/passport")(passport); // Import Passport config
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User"); // Import User Model
const Song = require("./models/Song");
const Playlist = require("./models/Playlist");
const app = express();
app.use(cors());
app.use(express.json());

app.use(passport.initialize());

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
