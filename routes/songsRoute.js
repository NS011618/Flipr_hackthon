const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Song = require("../models/songModel");
const User = require("../models/userModel");
router.post("/get-all-songs", authMiddleware, async (req, res) => {
  try {
    const songs = await Song.find();
    return res
      .status(200)
      .send({
        message: "songs fetched successfully",
        success: true,
        data: songs,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error fetching songs", success: true, data: error });
  }
});

router.post("/add-playlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const existingPlaylists = user.playlists;
    existingPlaylists.push({
      name: req.body.name,
      songs: req.body.songs,
    });
    const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
      playlists: existingPlaylists,
    });
    return res
      .status(200)
      .send({
        message: "playlist created successfully",
        success: true,
        data: updatedUser,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error creating playlist", success: true, data: error });
  }
});
module.exports = router;
