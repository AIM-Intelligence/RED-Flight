import { NextRequest, NextResponse } from 'next/server';

import { createSupabaseServer } from '@/lib/supabase/createSupabaseAdmin';
import { getAuthStatus } from '@/server/auth/auth';

type UpdateUserProfileParams = {
  name: string | null;
  description: string | null;
  email: string | null;
  imageUrl: string | null;
  imageBase64?: string | null;
  fileName?: string | null;
  mimeType?: string | null;
};

export async function POST(request: NextRequest) {
  try {
    const params: UpdateUserProfileParams = await request.json();
    const {
      name,
      description,
      email,
      imageUrl,
      imageBase64,
      fileName,
      mimeType,
    } = params;

    // Check authentication status
    const authStatus = await getAuthStatus();

    if (!authStatus.isLoggedIn) {
      return NextResponse.json(
        { error: 'User is not logged in' },
        { status: 401 }
      );
    }

    const walletAddress = authStatus.walletAddress?.parsedJWT.sub;

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address not found' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = createSupabaseServer();

    // Handle image upload if a new image is provided
    let finalImageUrl = imageUrl;

    if (imageBase64 && fileName && mimeType) {
      try {
        // Extract the base64 data - remove the data:image/jpeg;base64, part
        const base64Data = imageBase64.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');

        // Create a unique file name
        const fileExt = fileName.split('.').pop();
        const uniqueFileName = `${walletAddress}_${Date.now()}.${fileExt}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('user-profile')
          .upload(uniqueFileName, buffer, {
            cacheControl: '3600',
            upsert: true,
            contentType: mimeType,
          });

        if (error) {
          console.error('Storage error:', error);
          return NextResponse.json(
            { error: `Failed to upload image: ${error.message}` },
            { status: 500 }
          );
        }

        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('user-profile')
          .getPublicUrl(data.path);

        finalImageUrl = urlData.publicUrl;
      } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
          { error: 'Failed to upload profile image' },
          { status: 500 }
        );
      }
    }

    // Update user profile with all data including the new image URL if there is one
    const { data, error } = await supabase
      .from('user')
      .update({
        name,
        description,
        email,
        image_url: finalImageUrl,
      })
      .eq('wallet_address', walletAddress)
      .select()
      .single();

    if (error) {
      switch (error.code) {
        case '23505':
          return NextResponse.json(
            { error: 'This name already exists' },
            { status: 400 }
          );
        case '23503':
          return NextResponse.json(
            { error: 'Referenced record does not exist' },
            { status: 400 }
          );
        case '23502':
          return NextResponse.json(
            { error: 'Required field is missing' },
            { status: 400 }
          );
        default:
          console.error('User update error:', error);
          return NextResponse.json(
            {
              error: `Failed to update user profile: ${error.message || 'Unknown error'}`,
            },
            { status: 500 }
          );
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
