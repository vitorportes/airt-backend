import express from "express";
import { createImage } from "../controllers/photoController.js";

const router = express.Router();

router.route("/").post(createImage);

export default router;
