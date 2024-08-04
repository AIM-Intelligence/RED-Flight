import { NextRequest } from "next/server";

import { OpenAI } from "openai";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

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
  Create an engaging and visually captivating lore for Zaion RedFlight, a futuristic vigilante group in the cyberpunk city of Zaion. The lore should reflect their free-spirited and relentless fight against rogue AI and cyber threats. Each member’s rank is determined by the number of successful contracts they have completed, symbolizing their experience and prowess in the ongoing war. The group is symbolized by a red butterfly, embodying their vigilance and freedom. Draw one person; this person should be in the center of the picture. Don't put a lot of text, put people first,
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
    return new Response(
      JSON.stringify({ imageData: `data:image/png;base64,${base64Image}` }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to generate or fetch image" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
