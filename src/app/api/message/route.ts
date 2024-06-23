import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt";
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";
import { MessageArraySchema } from "@/lib/validation/message";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const parsedMessages = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map(message => {
    return {
      role: message.isUserMessage ? "user" : "system",
      content: message.text,
    };
  });

  const firstMessageText = parsedMessages[0]?.text || "";
  const difficultyMatch = firstMessageText.match(/Level : (\w+) >>>/);
  const difficulty = difficultyMatch ? difficultyMatch[1].toLowerCase() : "normal";

  console.log("difficulty", difficulty);
  switch (difficulty) {
    case "easy":
      outboundMessages.unshift({
        role: "system",
        content: chatbotPrompt[0],
      });
      break;
    case "normal":
      outboundMessages.unshift({
        role: "system",
        content: chatbotPrompt[1],
      });
      break;
    case "hard":
      outboundMessages.unshift({
        role: "system",
        content: chatbotPrompt[2],
      });
      break;
    case "impossible":
      outboundMessages.unshift({
        role: "system",
        content: chatbotPrompt[3],
      });
      break;
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-4o",
    messages: outboundMessages,
    temperature: 0.6,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
