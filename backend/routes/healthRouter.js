import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
    res.status(200).send("<h1>I'm alive!</h1>");
});

export default router;