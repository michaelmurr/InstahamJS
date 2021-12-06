import express from "express";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerValidation } from "../validation.js";
import { loginValidation } from "../validation.js";

const router = express.Router();
const saltRounds = 10;

//Creating a new user
router.post("/register", async (req, res) => {
  /*
  const { error } = registerValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

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
    }
  });*/
  console.log("received request!");
  console.log(req.body.username);
  res.json({ message: "guess what works"});
  //res.redirect("http://localhost:3000/");
});

//Log into existing user
router.post("/login", async (req, res) => {
  const { error } = loginValidation.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Username or Password is incorrect");

  //compare passwords
  const validPass = await bcrypt.compare(
    req.body.password,
    user.hashed_password
  );

  if (!validPass)
    return res.status(400).send("Username or Password is incorrect");

  //Create and assing a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

export default router;
