import OpenAI from "openai";

import { getAuthStatus } from "@/server/auth/auth";
import { MessageArraySchema } from "@/validation/assist-messages";

export const maxDuration = 30;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    throw new Error("User is not logged in");
  }

  const walletAddress = authStatus.walletAddress?.parsedJWT.sub;
  const jti = authStatus.walletAddress?.parsedJWT.jti;

  if (!walletAddress || !jti) {
    throw new Error("Wallet address not found");
  }

  const { messages } = await req.json();

  console.log("Raw messages:", JSON.stringify(messages, null, 2));

  const parsedMessages = MessageArraySchema.parse(messages);

  console.log("parsedMessages", parsedMessages);

  const outboundMessages: OpenAI.ChatCompletionMessageParam[] =
    parsedMessages.map(message => ({
      role: message.user ? "user" : "assistant",
      content: message.text,
    }));

  outboundMessages.unshift({
    role: "system",
    content: `This is meesages: `,
  });

  console.log("outboundMessages", outboundMessages);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: outboundMessages,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 300,
      n: 1,
    });

    console.log("completion", completion);

    const result = completion.choices[0].message.content;

    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
