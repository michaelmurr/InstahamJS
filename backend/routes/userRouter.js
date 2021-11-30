import express from "express";
import User from "../models/userSchema.js";
const router = express.Router();

//Get all users
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

//Create a new user
router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.name,
    email: req.body.email
  });

  try {
    const savedUser = await user.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a specific User
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete a user
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.userId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a User
router.patch("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { name: req.body.name } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});
export default router;
