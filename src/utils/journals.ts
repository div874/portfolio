import { supabase } from '../supabase';
import { articlesData } from '../data/articlesData';
import { normalizeAttachments, DocumentAttachment } from './attachments';

export interface JournalEntry {
  slug: string;
  title: string;
  date: string;
  category: string;
  status: string;
  excerpt: string;
  readingTime: string;
  tag: string;
  image: string;
  tags: string[];
  content: string;
  id: string;
  attachments?: DocumentAttachment[];
}

const mapArticleToJournal = (item: any): JournalEntry => ({
  slug: item.slug,
  title: item.title,
  date: item.date || item.published_date || item.publishedDate || item.created_at?.split('T')[0] || '',
  category: item.category || 'AI & AUTOMATION',
  status: item.status || 'PUBLISHED',
  excerpt: item.excerpt || '',
  readingTime: item.reading_time || item.readingTime || item.read_time || item.readTime || '5 min read',
  tag: item.tag || item.category || 'Article',
  image: item.image || '',
  tags: Array.isArray(item.tags) ? item.tags : [],
  content: item.content || '',
  id: String(item.id || item.slug),
  attachments: normalizeAttachments(item.attachments),
});

export const getJournals = async (includeDrafts: boolean = false): Promise<JournalEntry[]> => {
  const combinedEntries: JournalEntry[] = [];
  const seenSlugs = new Set<string>();

  // 1. Fetch from journals table
  try {
    const { data: journalData, error: jError } = await supabase
      .from('journals')
      .select('*')
      .order('date', { ascending: false });

    if (!jError && journalData) {
      for (const item of journalData) {
        if (!includeDrafts && item.status === 'DRAFT') continue;
        if (item.slug && !seenSlugs.has(item.slug)) {
          seenSlugs.add(item.slug);
          combinedEntries.push({
            ...item,
            readingTime: item.reading_time || item.readingTime || '3 min read',
            tags: Array.isArray(item.tags) ? item.tags : [],
            attachments: normalizeAttachments(item.attachments),
          });
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch journals from Supabase:", err);
  }

  // 2. Fetch from articles table (combining articles into journal)
  try {
    const { data: articleData, error: aError } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false });

    if (!aError && articleData) {
      for (const item of articleData) {
        if (!includeDrafts && item.status === 'DRAFT') continue;
        if (item.slug && !seenSlugs.has(item.slug)) {
          seenSlugs.add(item.slug);
          combinedEntries.push(mapArticleToJournal(item));
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch articles from Supabase:", err);
  }

  // 3. Fallback to static articlesData if any missing from DB
  for (const staticItem of articlesData) {
    if (!seenSlugs.has(staticItem.slug)) {
      seenSlugs.add(staticItem.slug);
      combinedEntries.push(mapArticleToJournal(staticItem));
    }
  }

  // Sort unified entries by date descending
  return combinedEntries.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateB - dateA;
  });
};

export const getJournalBySlug = async (slug: string, includeDrafts: boolean = false): Promise<JournalEntry | null> => {
  // 1. Check journals table
  try {
    const { data, error } = await supabase.from('journals').select('*').eq('slug', slug).single();
    if (!error && data) {
      if (!includeDrafts && data.status === 'DRAFT') return null;
      return {
        ...data,
        readingTime: data.reading_time || data.readingTime || '3 min read',
        tags: Array.isArray(data.tags) ? data.tags : [],
        attachments: normalizeAttachments(data.attachments),
      } as JournalEntry;
    }
  } catch (err) {
    // Continue to articles check
  }

  // 2. Check articles table
  try {
    const { data, error } = await supabase.from('articles').select('*').eq('slug', slug).single();
    if (!error && data) {
      if (!includeDrafts && data.status === 'DRAFT') return null;
      return mapArticleToJournal(data);
    }
  } catch (err) {
    // Continue to static check
  }

  // 3. Fallback to static articles
  const foundStatic = articlesData.find(a => a.slug === slug);
  if (foundStatic) {
    return mapArticleToJournal(foundStatic);
  }

  return null;
};

