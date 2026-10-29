import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/supabase';
import { detectAttachmentType, formatFileSize } from '@/utils/attachments';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const requestedBucket = (formData.get('bucket') as string) || 'journal-images';

    if (!file) {
      return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
    }

    const adminSupabase = getAdminSupabase();

    // Prepare clean file name
    const fileExt = file.name.includes('.') ? file.name.split('.').pop() : '';
    const safeBase = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${Date.now()}-${safeBase}${fileExt ? `.${fileExt}` : ''}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = file.type || 'application/octet-stream';

    // List buckets and ensure bucket exists
    let targetBucket = requestedBucket;
    try {
      const { data: buckets, error: bError } = await adminSupabase.storage.listBuckets();
      if (!bError && buckets) {
        const found = buckets.find(b => b.name === targetBucket);
        if (!found) {
          // Attempt to create public bucket
          await adminSupabase.storage.createBucket(targetBucket, {
            public: true,
          });
        }
      }
    } catch (bErr) {
      console.warn('Could not list/create storage bucket automatically:', bErr);
    }

    // Upload with service role client (bypasses RLS)
    let uploadResult = await adminSupabase.storage
      .from(targetBucket)
      .upload(fileName, buffer, {
        contentType,
        upsert: true,
        cacheControl: '3600',
      });

    // Fallback bucket attempt if first one failed
    if (uploadResult.error) {
      const fallbackBucket = targetBucket === 'journal-images' ? 'portfolio-attachments' : 'journal-images';
      const secondAttempt = await adminSupabase.storage
        .from(fallbackBucket)
        .upload(fileName, buffer, {
          contentType,
          upsert: true,
          cacheControl: '3600',
        });

      if (!secondAttempt.error) {
        uploadResult = secondAttempt;
        targetBucket = fallbackBucket;
      }
    }

    if (uploadResult.error) {
      return NextResponse.json(
        { error: `Storage upload failed: ${uploadResult.error.message}` },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = adminSupabase.storage
      .from(targetBucket)
      .getPublicUrl(fileName);

    const attachment = {
      id: `att-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      name: file.name,
      url: publicUrlData.publicUrl,
      type: detectAttachmentType(file.name),
      size: formatFileSize(file.size),
      uploadedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      attachment,
    });
  } catch (err: any) {
    console.error('Upload API route error:', err);
    return NextResponse.json(
      { error: err.message || 'Server error processing file upload' },
      { status: 500 }
    );
  }
}

