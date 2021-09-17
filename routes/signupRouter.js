import express from "express";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 10;

//Creating a new user
router.post("/", (req, res) => {
  if (User.findOne({ username: req.body.username }).exec() != null) {
/*
    bcrypt.hash(req.body.pt_password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        res.json(err);
      }
      const user = new User({
        username: req.body.username,
        hashed_password: hash,
      });
      res.send(hash);
    });
*/
    bcrypt
      .hash(req.body.pt_password, saltRounds)
      .then((hash) => {
        res.send(hash);
      })
      .catch((err) => {
        res.send(err);
      });
  }else{
    res.send("Username already exists!");
  }
});

export default router;
