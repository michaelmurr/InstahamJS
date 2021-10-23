import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res) => {
  //res.render("index");
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

export default router;
