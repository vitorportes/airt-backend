import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function createImage(req, res) {
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
}
