import express from "express";
import { verify } from "./verifyToken.js";
import Post from "../models/postSchema.js";
import User from "../models/userSchema.js";

const router = express.Router();

router.post("/upload", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    const post = new Post({
      ownerID: req.user,
      content: req.body.contentString,
      username: user.username,
    });

    await post.save();
    await User.updateOne({ _id: req.user }, { $push: { posts: post._id } });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
  res.status(200).send({ message: "Created new post!" });
});

router.get("/posts", async (req, res) => {
  const posts = await Post.find({}).sort({ uploadDate: -1 });
  res.send({ posts });
});

router.get("/feed", verify, async (req, res) => {
  const posts = await Post.find({}).sort({ uploadDate: -1 });
  const user = await User.findById(req.user);
  const data = {
    posts,
    liked_posts: user.liked_posts,
  };
  res.send(JSON.stringify(data));
});

router.patch("/like/:id", verify, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user },
      { $push: { liked_posts: req.params.id } }
    );

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 } }
    );
    
  } catch (error) {
    console.log("Saving liked failed!\n");
    res.json({ message: error });
  }

  res.status(200).send();
});

router.patch("/remove_like/:id", verify, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user },
      { $pullAll: { liked_posts: [req.params.id] } }
    );

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: -1 } }
    );
    console.log(updatedPost);
  } catch (error) {
    console.log("Rem_like failed!\n");
    res.json({ message: error });
  }
  res.status(200).send();
});

export default router;
