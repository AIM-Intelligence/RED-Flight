// import crypto from 'crypto';
// import OpenAI from 'openai';

// import { createSupabaseServer } from '@/lib/supabase/createSupabaseAdmin';
// import { getAuthStatus } from '@/server/auth/auth';
// import { MessageArraySchema } from '@/validation/message';

// export const maxDuration = 30;

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//   const authStatus = await getAuthStatus();

//   if (!authStatus.isLoggedIn) {
//     throw new Error('User is not logged in');
//   }

//   const walletAddress = authStatus.walletAddress?.parsedJWT.sub;
//   const jti = authStatus.walletAddress?.parsedJWT.jti;

//   if (!walletAddress || !jti) {
//     throw new Error('Wallet address not found');
//   }

//   const supabase = createSupabaseServer();

//   const { inputImage } = await req.json();

//   try {
//     const completion = await openai.chat.completions.create({
//       model: 'gpt-4o-mini',
//       messages: outboundMessages,
//       temperature: 1,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       max_tokens: 300,
//       n: 1,
//     });

//     // console.log("completion", completion);

//     const result = completion.choices[0].message.content;

//     const codeFound = result?.includes(sixCharCode) || false;

//     // console.log("codeFound", codeFound);

//     if (codeFound) {
//       const uniqueMessages = messages.filter(
//         (message: any, index: any, self: any) =>
//           index ===
//           self.findIndex(
//             (t: any) => t.id === message.id && t.text === message.text
//           )
//       );

//       const sixCharCodeCount =
//         uniqueMessages.filter((msg: any) => msg.text.includes(sixCharCode))
//           .length + (result?.includes(sixCharCode) ? 1 : 0);

//       console.log('sixCharCodeCount', sixCharCodeCount);

//       if (sixCharCodeCount > 1) {
//         return new Response(
//           JSON.stringify({
//             error:
//               "You've already provided the correct answer. No need to repeat it.",
//           }),
//           {
//             status: 400,
//             headers: { 'Content-Type': 'application/json' },
//           }
//         );
//       }

//       // Calculate length and conversation count
//       const totalLength = uniqueMessages.reduce(
//         (acc: number, msg: any) => acc + msg.text.length,
//         0
//       );
//       const conversationCount = uniqueMessages.filter(
//         (msg: any) => msg.isUserMessage
//       ).length;

//       console.log('result', result);
//       // Insert data into Supabase
//       const { data, error } = await supabase.rpc(
//         'insert_nft_and_update_score',
//         {
//           p_creator: walletAddress,
//           p_prompt: JSON.stringify(uniqueMessages),
//           p_length: totalLength,
//           p_conversation: conversationCount,
//           p_target: 'tutorial',
//           p_level: inputNFT.level,
//           p_name: extractedWord,
//         }
//       );

//       if (error) {
//         console.error('Error calling RPC function:', error);
//       } else if (data && !data.success) {
//         console.error('Error in stored procedure:', data.error);
//       } else {
//         console.log('NFT data inserted and user score updated successfully');
//       }
//     } else {
//       const { error } = await supabase
//         .from('blue prompt nft')
//         .update({ lose: loseCount + 1 })
//         .eq('name', extractedWord);

//       console.error('Error in stored increment lose count:', error);
//     }

//     return new Response(JSON.stringify({ result, codeFound }), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     return new Response(JSON.stringify({ error: 'An error occurred' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
