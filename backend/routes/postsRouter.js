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
    uid: req.user,
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
  } catch (error) {
    console.log("Rem_like failed!\n");
    res.json({ message: error });
  }
  res.status(200).send();
});

router.delete("/del_post/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if(post.ownerID !== req.user) return res.status(401).send({message: "Unauthorized"});

    const deletedPost = await Post.findOneAndDelete({ _id: req.params.id });
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user },
      { $pull: { posts: [req.params.id] } }
    );
    res.status(200).send();
  } catch (e) {
    console.log("Couldn't delete post");
    res.status(400).send({ message: e });
  }
});

export default router;
