import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { registerValidation } from "../validation.js";
import { loginValidation } from "../validation.js";

const router = express.Router();
const saltRounds = 10;

//Creating a new user
router.post("/register", async (req, res) => {
  const { error } = registerValidation.validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    res.statusMessage = error.details[0].message;
    return res.status(400).end();
  }

  //check if email already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists != null) {
    res.statusMessage = "Email already exists!";
    return res.status(400).end();
  }

  //check if username already exists
  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists != null) {
    res.statusMessage = "Username already exists!";
    return res.status(400).end();
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      res.json(err);
    }
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        hashed_password: hash,
      });
      user.save();
      res.send({ User: user.id });
    } catch (err) {
      res.send({ message: err });
      console.log(err);
    }
  });
});

//Log into existing user
router.post("/login", async (req, res) => {
  const { error } = loginValidation.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    res.statusMessage = error.details[0].message;
    return res.status(400).end();
  }

  //check if username exists in DB
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.statusMessage = "Username or Password is incorrect";
    return res.status(400).end();
  }

  //compare passwords
  const validPass = await bcrypt.compare(
    req.body.password,
    user.hashed_password
  );

  //passwords dont match? => return error
  if (!validPass) {
    res.statusMessage = "Username or Password is incorrect";
    return res.status(400).end();
  }

  //Create and assing a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  console.log("Created Token: ", token);
  res.header("auth-token", token).status(200);
});

export default router;
