import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => res.send("api funcionando"));

router.route("/").post(async (req, res) => {
  try {
    const { phrase } = req.body;

    const aiResponse = await openai.createImage({
      prompt: phrase,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;

    return res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
