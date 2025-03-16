import { NextRequest, NextResponse } from 'next/server';

import { createSupabaseServer } from '@/lib/supabase/createSupabaseAdmin';
import { getAuthStatus } from '@/server/auth/auth';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
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
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Check file size (10MB limit)
    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate unique file path
    const timestamp = Date.now();
    const fileName = `${walletAddress}_${timestamp}_${image.name.replace(/\s/g, '_')}`;
    const filePath = `user_uploads/${fileName}`;

    // Upload to Supabase Storage
    const supabase = createSupabaseServer();
    const { error } = await supabase.storage
      .from('images') // Replace with your bucket name
      .upload(filePath, buffer, {
        contentType: image.type,
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage error:', error);
      return NextResponse.json(
        { error: 'Failed to upload image to storage' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('images') // Replace with your bucket name
      .getPublicUrl(filePath);

    return NextResponse.json({ url: urlData.publicUrl }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
