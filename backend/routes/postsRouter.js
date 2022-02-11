import express from "express";
import { verify } from "./verifyToken.js";
import Post from "../models/postSchema.js";
import User from "../models/userSchema.js";

const router = express.Router();

router.post("/upload", verify, async (req, res) => {
  const user = await User.findById(req.user);

  try {
    const post = new Post({
      ownerID: req.user,
      content: req.body.contentString,
    });
    await post.save();

    await User.updateOne({ _id: req.user }, { $push: { posts: post._id } });
  } catch (e) {
    console.error(e);
  }

  res.status(200).send("Created new post!");
});

router.get("/posts", async (req, res) => {
  const posts = await Post.find({}).sort({uploadDate: -1}).limit(20);
  
  res.send({posts});
});

export default router;