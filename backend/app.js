//Modules
import fs from "fs";
import cors from "cors";
import path from "path";
import https from "https";
import dotenv from "dotenv";
import express from "express";
import { dirname } from "path";
import mongoose from "mongoose";
import env from "dotenv/config";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

//Routers
import indexRouter from "./routes/indexRouter.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";

const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const corsOptions = {
    origin:"*",
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.use(indexRouter);
app.use(authRouter);
app.use("/api/posts", postRouter);

try{
    mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
        console.log("[DB] Connected!");
    });
}catch(err){
    console.log(err);
}

//code for running the server as https
https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
}, app)
.listen(port, () => {
    console.log(`[Server] running on port ${port}`);
});

/*
app.listen(port, () => {
    console.log(`[Server] running on port ${port}`);
})
*/