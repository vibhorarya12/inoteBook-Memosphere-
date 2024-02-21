const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const User = require('../models/User');
router.get("/allnotes", async (req, res) => {
  try {
    const notesWithUsers = await Note.find().populate("user", "name email");
    res.json(notesWithUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find({}, "name email Date");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/notes/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const notesForUser = await Note.find({ user: userId });
    
    if (!notesForUser || notesForUser.length === 0) {
      return res.status(404).json({ error: "Notes not found for the user" });
    }
    
    res.json(notesForUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
