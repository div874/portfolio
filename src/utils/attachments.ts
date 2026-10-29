import { supabase } from '../supabase';

export type AttachmentType = 'pdf' | 'ppt' | 'pptx' | 'doc' | 'docx' | 'sheet' | 'image' | 'archive' | 'other';

export interface DocumentAttachment {
  id?: string;
  name: string;
  url: string;
  type?: AttachmentType;
  size?: string;
  uploadedAt?: string;
}

/**
 * Format bytes to human readable string (e.g. "2.4 MB")
 */
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Detects attachment type from file name or URL
 */
export function detectAttachmentType(nameOrUrl: string): AttachmentType {
  const clean = (nameOrUrl || '').toLowerCase().split('?')[0].split('#')[0];

  if (clean.endsWith('.pdf')) return 'pdf';
  if (clean.endsWith('.pptx')) return 'pptx';
  if (clean.endsWith('.ppt')) return 'ppt';
  if (clean.endsWith('.docx')) return 'docx';
  if (clean.endsWith('.doc')) return 'doc';
  if (clean.endsWith('.xlsx') || clean.endsWith('.xls') || clean.endsWith('.csv')) return 'sheet';
  if (clean.endsWith('.zip') || clean.endsWith('.rar') || clean.endsWith('.7z') || clean.endsWith('.tar') || clean.endsWith('.gz')) return 'archive';
  if (
    clean.endsWith('.jpg') ||
    clean.endsWith('.jpeg') ||
    clean.endsWith('.png') ||
    clean.endsWith('.webp') ||
    clean.endsWith('.svg') ||
    clean.endsWith('.gif') ||
    clean.endsWith('.bmp')
  ) {
    return 'image';
  }

  // Check URL keywords for web links (e.g. Google Slides, Drive, Docs)
  if (clean.includes('slides.google') || clean.includes('presentation')) return 'pptx';
  if (clean.includes('docs.google') || clean.includes('document')) return 'docx';
  if (clean.includes('sheets.google') || clean.includes('spreadsheets')) return 'sheet';

  return 'other';
}

/**
 * Uploads a document or presentation file to Supabase Storage
 */
export async function uploadAttachmentFile(
  file: File,
  preferredBucket: string = 'journal-images'
): Promise<{ success: boolean; attachment?: DocumentAttachment; error?: string }> {
  try {
    const fileExt = file.name.includes('.') ? file.name.split('.').pop() : '';
    const safeBase = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${Date.now()}-${safeBase}${fileExt ? `.${fileExt}` : ''}`;
    const detectedType = detectAttachmentType(file.name);
    const sizeStr = formatFileSize(file.size);

    // Try primary bucket first (default 'journal-images')
    let uploadResult = await supabase.storage.from(preferredBucket).upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    });

    let activeBucket = preferredBucket;

    // Fallback attempt to 'portfolio-attachments' if primary fails
    if (uploadResult.error) {
      console.warn(`Upload to ${preferredBucket} failed:`, uploadResult.error.message);
      const fallbackBucket = preferredBucket === 'journal-images' ? 'portfolio-attachments' : 'journal-images';
      const secondAttempt = await supabase.storage.from(fallbackBucket).upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

      if (!secondAttempt.error) {
        uploadResult = secondAttempt;
        activeBucket = fallbackBucket;
      }
    }

    if (uploadResult.error) {
      return {
        success: false,
        error: uploadResult.error.message || 'File upload failed to storage bucket',
      };
    }

    const { data: publicUrlData } = supabase.storage.from(activeBucket).getPublicUrl(fileName);

    const attachment: DocumentAttachment = {
      id: `att-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      name: file.name,
      url: publicUrlData.publicUrl,
      type: detectedType,
      size: sizeStr,
      uploadedAt: new Date().toISOString(),
    };

    return {
      success: true,
      attachment,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Unexpected error occurred while uploading file',
    };
  }
}

/**
 * Normalizes attachments from diverse payload forms (JSON string, array, objects)
 */
export function normalizeAttachments(raw: any): DocumentAttachment[] {
  if (!raw) return [];
  let list: any[] = [];

  if (Array.isArray(raw)) {
    list = raw;
  } else if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) list = parsed;
      else if (parsed && typeof parsed === 'object') list = [parsed];
    } catch {
      return [];
    }
  } else if (typeof raw === 'object') {
    list = [raw];
  }

  return list
    .filter(item => item && (item.url || item.name))
    .map(item => ({
      id: item.id || `att-${Math.random().toString(36).substring(7)}`,
      name: String(item.name || 'Untitled Document').trim(),
      url: String(item.url || '').trim(),
      type: (item.type || detectAttachmentType(item.name || item.url)) as AttachmentType,
      size: item.size ? String(item.size) : undefined,
      uploadedAt: item.uploadedAt || undefined,
    }));
}

