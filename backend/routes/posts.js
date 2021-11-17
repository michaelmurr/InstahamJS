import express from "express";
import { verify } from "./verifyToken.js";

const router = express.Router();

router.get("/", /*verify,*/(req, res) => {

    /* ownerID, filename, uploadDate, likes*/

    let postArray = [
        {
            "ownerID": "dswaefrgthzjuk",
            "filename": "image1.jpg",
            "uploadDate": "2020-10-10",
            "likes": 23,
        },
        {
            "ownerID": "76re8udizjhxdfgnb",
            "filename": "image2.png",
            "uploadDate": "2019-01-13",
            "likes": 4000,
        },
        {
            "ownerID": "2q3w4e5rtz6ugjh",
            "filename": "graphic.svg",
            "uploadDate": "2021-08-03",
            "likes": 60,
        },
    ]

    res.json(postArray);
    /*
    {
        postData: {
            title: "My first post",
            description: "Random data you shouldnt access"
        }
    }
    */



});

export default router;