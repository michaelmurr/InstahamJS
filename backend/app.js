//Modules
import cors from "cors";
import path from "path";
import express from "express";
import { dirname } from "path";
import mongoose from "mongoose";
import env from "dotenv/config"; //Even if marked as unused, removing it breaks the app
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

//Routers
import indexRouter from "./routes/indexRouter.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/postsRouter.js";
import userRouter from "./routes/userRouter.js";

const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

//Middleware
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authRouter);
app.use("/api", postRouter);
app.use("/api", userRouter);

//connect to db
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port);
  })
  .then(() => {
    console.log(`Server up and running on port ${port}`);
  })
  .catch((err) => {
    console.log(err);
  });