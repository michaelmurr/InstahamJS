//Modules
import express from "express";
import https from "https";
import path from "path";
import { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import env from "dotenv/config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

//Routers
import indexRouter from "./routes/indexRouter.js";
import userRouter from "./routes/userRouter.js";  
import signupRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";

const port = process.env.PORT || 3000;
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

app.use(indexRouter);
app.use(signupRouter);
app.use("/api/posts", postRouter);
//app.use("/user", userRouter);

try{
    mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
        console.log("[DB] Connected!");
    });
}catch(err){
    console.log(err);
}

//code for running the server as https
/*
https.createServer({
    key: fs.readFileSync("ssl/server.key"),
    cert: fs.readFileSync("ssl/server.cert")
}, app)
.listen(port, () => {
    console.log(`[Server] running on port ${port}`);

});
*/

app.listen(port, () => {
    console.log(`[Server] running on port ${port}`);
})