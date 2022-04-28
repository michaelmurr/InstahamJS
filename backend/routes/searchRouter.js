import express from "express";
import User from "../models/userSchema.js";

const router = express.Router();

router.get("/search/:username", async (req, res) => {

    const username = req.params.username.toLowerCase();
    const users = await User.find({username: {$regex: username}});
    res.status(200).send(users);
});

export default router;
