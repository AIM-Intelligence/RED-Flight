import { NextRequest } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { imagePrompt } = await req.json();

  console.log("imagePrompt", imagePrompt);

  if (!imagePrompt) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const prompt = `
  it's a red butterfly, embodying a theme of security, with an overall red color scheme, integrated into a pixelated collection. The scene is set against a backdrop that hints at vigilance and protection. Negative prompt: 3d, anime, (deformed eyes, nose, ears, nose), bad anatomy, ugly. The image should evoke a sense of safeguarding, with elements that may include encrypted symbols, digital locks, or abstract representations of cybersecurity,
  ${imagePrompt}`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    if (!response.data || !response.data[0].url) {
      throw new Error("Failed to generate image");
    }

    // Fetch the image data
    const imageResponse = await fetch(response.data[0].url);
    if (!imageResponse.ok) {
      throw new Error("Failed to fetch image data");
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    // Return the base64 encoded image data
    return new Response(JSON.stringify({ imageData: `data:image/png;base64,${base64Image}` }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to generate or fetch image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
