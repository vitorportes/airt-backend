import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import photoRoute from "./routes/photoRoute.js";
import postRoute from "./routes/postRoute.js";

import connectDb from "../mongodb/connect.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/post", postRoute);
app.use("/api/photo", photoRoute);

const startServer = async () => {
  try {
    connectDb(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("server running");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
