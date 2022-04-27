import express from "express";
import User from "../models/userSchema.js";

const router = express.Router();

router.get("/search/:username", async (req, res) => {

    const username = req.params.username.toLowerCase();
    const user = await User.find({username: {$regex: username}});
    console.log(user);
    res.status(200).send();
});

export default router;
