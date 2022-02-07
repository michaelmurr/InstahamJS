import express from "express";
import { verify } from "./verifyToken.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Post from "../models/postSchema.js";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post("/upload", (req, res, next) => {
    const token = req.header("auth-token");
    console.log(token);
    if(!token) res.redirect("localhost:3000/login");

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      next();
    } else {
      let user = await User.findById(decodedToken._id);
      console.log(decodedToken);

      try {
        const post = new Post({
          ownerID: user._id,
          content: req.body.contentString,
        });
        post.save();
      } catch (e) {
        console.error(e.message);
      }

      try {
        const updatedUser = await User.updateOne(
          { _id: user._id },
          { $push: { posts: post._id } }
        );
      } catch (e) {
        console.log(e.message);
      }
    }
  });
});

router.get("/posts", (req, res) => {
  /* ownerID, filename, uploadDate, likes*/

  let postArray = [
    {
      ownerID: "dswaefrgthzjuk",
      filename: "image1.jpg",
      uploadDate: "2020-10-10",
      likes: 23,
    },
    {
      ownerID: "76re8udizjhxdfgnb",
      filename: "image2.png",
      uploadDate: "2019-01-13",
      likes: 4000,
    },
    {
      ownerID: "2q3w4e5rtz6ugjh",
      filename: "graphic.svg",
      uploadDate: "2021-08-03",
      likes: 60,
    },
  ];

  res.json(postArray);
  /*
    {
        postData: {
            title: "My first post",
            description: "Random data you shouldnt access"
        }
    }
    */
});

export default router;
