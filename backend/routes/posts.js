import express from "express";
import {verify} from "./verifyToken.js";

const router = express.Router();

router.get("/", /*verify,*/ (req, res) => {

/* ownerID, filename, uploadDate, likes*/
/*
let postArray = [
    {

    },
    {

    },
    {

    },
]
*/
    res.json({
        postData:{
            title: "My first post",
            description:"Random data you shouldnt access" 
        }
    });

});

export default router;