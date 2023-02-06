import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../../mongodb/models/post.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getPosts(req, res) {
  try {
    const posts = await Post.find({});

    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}

export async function createPost(req, res) {
  try {
    const { name, phrase, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      phrase,
      photo: photoUrl.url,
    });

    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}
