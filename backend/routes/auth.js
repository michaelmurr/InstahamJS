import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { registerValidation } from "../validation.js";
import { loginValidation } from "../validation.js";

const router = express.Router();
const saltRounds = 12; //raising this number bricks the app

//Creating a new user
router.post("/register", async (req, res) => {
  const { error } = registerValidation.validate(req.body);
  if (error) return res.status(400).send(error);

  //check if email already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists!");

  //check if username already exists
  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists) return res.status(400).send("Username already exists!");

  //Encrypt the password before saving it in the db
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) res.send(err);

    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        hashed_password: hash,
      });
      user.save();
      return res.status(200).send("Success!");
    } catch (err) {
      res.send(err);
    }
  });
});

//Log into existing user
router.post("/login", async (req, res) => {
  /*
 const { error } = loginValidation.validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    res.statusMessage = error.details[0].message;
    return res.status(400).end();
  }
*/
  //check if username exists in DB
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Username or Password is incorrect");

  //compare passwords
  const validPass = await bcrypt.compare(
    req.body.password,
    user.hashed_password
  );
  if (!validPass) return res.status(400).send("Username or Password is incorrect");

  //Create and assing a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.send({ token: token });
});

export default router;