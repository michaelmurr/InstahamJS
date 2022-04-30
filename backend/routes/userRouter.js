import express from "express";
import User from "../models/userSchema.js";
import Post from "../models/postSchema.js";
import { verify } from "../routes/verifyToken.js";

const router = express.Router();

//Get own Profile
router.get("/profile", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const posts = await Post.find({ ownerID: req.user }).sort({
      uploadDate: -1,
    });

    const data = JSON.stringify({
      _id: user._id,
      username: user.username,
      posts,
      liked_posts: user.liked_posts,
      date_joined: user.date_joined,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ message: err });
  }
});

//View any profile
router.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const posts = await Post.find({ownerID: req.params.id}).sort({uploadDate: -1});
  const data = {
    username: user.username,
    posts,
    date_joined: user.date_joined,
  }

  res.status(200).send(JSON.stringify(data));
});

//Delete a user
router.delete("/deleteAccount", verify, async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.user });
    res.status(200).send();
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
