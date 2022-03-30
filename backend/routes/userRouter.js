import express from "express";
import User from "../models/userSchema.js";
import Post from "../models/postSchema.js";
import {verify} from "../routes/verifyToken.js";

const router = express.Router();

//Get a specific User
router.get("/profile", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const posts = await Post.find({ownerID: req.user}).sort({uploadDate: -1});

    const data = JSON.stringify({username: user.username, posts, liked_posts: user.liked_posts, date_joined: user.date_joined });
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ message: err });
  }
});
/*
//Delete a user
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.userId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a User
router.patch("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { name: req.body.name } }
      );
      res.json(updatedUser);
    } catch (err) {
      res.json({ message: err });
    }
  });
  */
 
  export default router;
  