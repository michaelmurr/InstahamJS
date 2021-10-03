import express from "express";
import {verify} from "./verifyToken.js";

const router = express.Router();

router.get("/", verify, (req, res) => {
    res.json({
        posts:{
            title: "My first post",
            description:"Random data you shouldnt access"
        }
    });
});

export default router;