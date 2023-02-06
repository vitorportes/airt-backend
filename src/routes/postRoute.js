import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";

const router = express.Router();

router.route("/").get(getPosts);

router.route("/").post(createPost);

export default router;
