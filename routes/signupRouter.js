import express from "express";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const saltRounds = 10;

//Log into existing user
router.get("/", (req, res) => {
  User.findOne({username: req.body.login_username}, (err, returnedUser) => {
    
    bcrypt.compare(req.body.login_pw, returnedUser.hashed_password, (err, result) => {
      if(err){
        res.send(err);
      }else if(result == true){
        //do stuff
        res.send("Login successfull!");
      }else if(result == false){
        res.send("Login failed!");
      }
    });
  });
});

//Creating a new user
router.post("/", (req, res) => {
//  if (User.findOne({ username: req.body.username }).exec() != null) {

    bcrypt.hash(req.body.pt_password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        res.json(err);
      }
      const user = new User({
        username: req.body.username,
        hashed_password: hash,
      });
      user.save();
      res.send(user);
    });
    /*
    bcrypt
    .hash(req.body.pt_password, saltRounds)
    .then((hash) => {
      res.send(hash);
    })
    .catch((err) => {
      res.send(err);
    });
    */
  //}else{
    //res.send("Username already exists!");
  //}
});

export default router;
