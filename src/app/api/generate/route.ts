import { NextRequest } from "next/server";

import { OpenAI } from "openai";

import { getAuthStatus } from "@/server/auth/auth";

export const maxDuration = 30;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { imagePrompt } = await req.json();

  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error("User is not logged in");
  }

  const walletAddress = authStatus.walletAddress?.parsedJWT.sub;

  if (!walletAddress) {
    throw new Error("Wallet address not found");
  }

  if (!imagePrompt) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const prompt = `${imagePrompt}`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    if (!response.data || !response.data[0].b64_json) {
      throw new Error("Failed to generate image");
    }

    const base64Data = response.data[0].b64_json;
    const binaryData = Buffer.from(base64Data, "base64");

    return new Response(
      JSON.stringify({
        url: `data:image/png;base64,${base64Data}`,
        blob: binaryData,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate image due to internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
