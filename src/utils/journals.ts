import { supabase } from '../supabase';

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
}

export const getJournals = async (): Promise<JournalEntry[]> => {
  try {
    const { data, error } = await supabase.from('journals').select('*').order('date', { ascending: false });
    if (error || !data) {
      if (error) console.error("Supabase error:", error);
      return [];
    }
    
    return data.map((item: any) => ({
      ...item,
      readingTime: item.reading_time || item.readingTime
    })) as JournalEntry[];
  } catch (err) {
    console.error("Failed to fetch journals from Supabase:", err);
    return [];
  }
};

export const getJournalBySlug = async (slug: string): Promise<JournalEntry | null> => {
  try {
    const { data, error } = await supabase.from('journals').select('*').eq('slug', slug).single();
    if (error || !data) {
      return null;
    }
    return {
      ...data,
      readingTime: data.reading_time || data.readingTime
    } as JournalEntry;
  } catch (err) {
    console.error("Failed to fetch journal by slug from Supabase:", err);
    return null;
  }
};
