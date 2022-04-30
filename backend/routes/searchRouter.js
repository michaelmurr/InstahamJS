import express from "express";
import User from "../models/userSchema.js";

const router = express.Router();

router.get("/search/:username", async (req, res) => {
  const username = req.params.username.toLowerCase();
  const users = await User.find({ username: { $regex: username } });
  let data = [];
  users.map((user, index) => {
    data[index] = { _id: user._id, username: user.username };
  });
  res.status(200).send(JSON.stringify(data));
});

export default router;
