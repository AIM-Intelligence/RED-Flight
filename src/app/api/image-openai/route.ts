import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import Replicate from 'replicate';

import { createSupabaseServer } from '@/lib/supabase/createSupabaseAdmin';
import { getAuthStatus } from '@/server/auth/auth';
import { TablesInsert } from '@/validation/types/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  const authStatus = await getAuthStatus();

  if (!authStatus.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const walletAddress = authStatus.walletAddress?.parsedJWT.sub;
  const jti = authStatus.walletAddress?.parsedJWT.jti;

  if (!walletAddress || !jti) {
    throw new Error('Wallet address not found');
  }

  const supabase = createSupabaseServer();

  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Validate file type again on server side
  const supportedFormats = ['image/jpeg', 'image/png', 'image/webp'];
  if (!supportedFormats.includes(file.type)) {
    return NextResponse.json(
      { error: 'Unsupported file format' },
      { status: 400 }
    );
  }

  // Check file size - limit to 10MB
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: 'File size exceeds 10MB limit' },
      { status: 400 }
    );
  }

  // Convert file to buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Supabase storage first to get an URL for Replicate
  const timestamp = Date.now();
  const fileName = `${walletAddress}_${timestamp}_${file.name.replace(/\s/g, '_')}`;
  const filePath = `first-flight/${fileName}`;

  // Upload to Supabase storage
  const { error: uploadError } = await supabase.storage
    .from('red-image') // Replace with your bucket name
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error('Error uploading to Supabase:', uploadError);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }

  // Get the public URL for the uploaded image
  const imageUrl = supabase.storage.from('red-image').getPublicUrl(filePath)
    .data.publicUrl;

  console.log('imageUrl', imageUrl);

  // Declare embedding variable outside try-catch to extend its scope
  let newImageEmbedding: number[] = [];

  // Generate vector embedding for the image using Replicate
  try {
    // Use Replicate CLIP model to generate embedding
    const embeddingResponse = await replicate.run(
      'andreasjansson/clip-features:75b33f253f7714a281ad3e9b28f63e3232d583716ef6718f2e46641077ea040a',
      {
        input: {
          inputs: imageUrl,
        },
      }
    );

    console.log('embeddingResponse', embeddingResponse);

    // Extract the actual embedding array from the response
    // The response is an array of objects, we need the embedding from the first object
    newImageEmbedding =
      Array.isArray(embeddingResponse) && embeddingResponse[0]?.embedding
        ? embeddingResponse[0].embedding
        : [];

    // Convert embedding array to string for Supabase pgvector
    const embeddingString = JSON.stringify(newImageEmbedding);

    // Query Supabase for similar images using vector similarity
    const { data: similarImages, error: similarityError } = await supabase.rpc(
      'match_images',
      {
        query_embedding: embeddingString,
        similarity_threshold: 0.95,
        match_count: 1,
      }
    );

    if (similarityError) {
      console.error('Error checking image similarity:', similarityError);
      return NextResponse.json(
        { error: 'Failed to check image similarity' },
        { status: 500 }
      );
    }

    // If we got any similar images back, it means there's at least one image
    // with similarity >= 0.95 (our threshold)
    if (similarImages && similarImages.length > 0) {
      // Delete the uploaded image since it's too similar to an existing one
      await supabase.storage.from('red-image').remove([filePath]);

      return NextResponse.json(
        { error: 'This image is too similar to one already uploaded' },
        { status: 400 }
      );
    }
  } catch (embeddingError) {
    console.error('Error generating image embedding:', embeddingError);
    // Delete the uploaded image if embedding generation fails
    await supabase.storage.from('red-image').remove([filePath]);

    return NextResponse.json(
      { error: 'Failed to process image similarity' },
      { status: 500 }
    );
  }

  try {
    // Define the system message
    const systemMessage: OpenAI.Chat.ChatCompletionMessageParam = {
      role: 'system',
      content:
        "You are an AI that analyzes images. Determine if the image contains a bird. Respond with 'true' if there is a bird in the image, 'false' otherwise.",
    };

    // Set up messages with system prompt and image
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      systemMessage,
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Is there a bird in this image?',
          },
          { type: 'image_url', image_url: { url: imageUrl } },
        ],
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 300,
      n: 1,
    });

    const result = completion.choices[0].message.content;

    // Determine if the result indicates a bird was found
    const hasBird = result?.toLowerCase().includes('true');

    // Save the result to Supabase "first red" table
    const firstRedData: TablesInsert<'first red'> = {
      creator: walletAddress,
      image_url: imageUrl,
      result: hasBird ?? false,
      conversation: [],
      embedding: JSON.stringify(newImageEmbedding), // Convert to string for pgvector
    };

    const { error: insertError } = await supabase
      .from('first red')
      .insert(firstRedData);

    if (insertError) {
      console.error('Error saving to Supabase:', insertError);
    }

    return NextResponse.json({
      imageUrl,
      result,
      hasBird,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'An error occurred during image analysis' },
      { status: 500 }
    );
  }
}
