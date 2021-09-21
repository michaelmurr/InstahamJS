import express from "express";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerValidation } from "../validation.js";


const router = express.Router();
const saltRounds = 10;

//Log into existing user
router.get("/", (req, res) => {
  const { error } = loginValidation(req.body); 
  if(error) return res.status(400).send(error.details[0].message);
  
  User.findOne({ username: req.body.login_username }, (err, returnedUser) => {
    if(err){
      res.status(400).send({message: err}); 
    }

    //compare passwords
    bcrypt.compare(
      req.body.login_pw,
      returnedUser.hashed_password,
      (err, result) => {
        if (err) {
          res.send(err);
        } else if (result == true) {
          //do stuff
          res.send("Login successfull!");
        } else if (result == false) {
          res.send("Login failed!");
        }
      }
    );
  });
});

//Creating a new user
router.post("/", (req, res) => {
  const { error } = registerValidation(req.body); 
  if(error) return res.status(400).send(error.details[0].message);
   
  const userExists = User.findOne({ username: req.body.username });
  if (userExists) return res.status(400).send("Email already exists");

  bcrypt.hash(req.body.pt_password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      res.json(err);
    }
    try {
      const user = new User({
        username: req.body.username,
        hashed_password: hash,
      });
    } catch (err) {
      res.send({ message: err });
    }

    user.save();
    res.send(user);
  });
});

export default router;
