import { supabase } from '../supabase';
import { articlesData, Article } from '../data/articlesData';

export type ArticleEntry = Article & {
  id?: string;
  status?: string;
};

export const getArticles = async (includeDrafts: boolean = false): Promise<ArticleEntry[]> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase articles fetch warning:", error.message);
      // Fallback to static articles data if table is empty or missing
      return articlesData.map(item => ({
        ...item,
        status: 'PUBLISHED',
        id: item.slug
      }));
    }

    const mapped = data.map((item: any) => ({
      slug: item.slug,
      title: item.title,
      category: item.category || 'AI & Engineering',
      excerpt: item.excerpt || '',
      readTime: item.read_time || item.readTime || '5 min read',
      publishedDate: item.date || item.published_date || item.publishedDate || new Date().toISOString().split('T')[0],
      author: typeof item.author === 'string' ? JSON.parse(item.author) : (item.author || { name: 'Divyansh Chandra', role: 'AI & Automation Specialist' }),
      tags: item.tags || [],
      tableOfContents: item.table_of_contents || item.tableOfContents || [],
      content: item.content || '',
      status: item.status || 'PUBLISHED',
      id: item.id
    })) as ArticleEntry[];

    if (!includeDrafts) {
      return mapped.filter(item => item.status !== 'DRAFT');
    }

    return mapped;
  } catch (err) {
    console.error("Failed to fetch articles from Supabase:", err);
    return articlesData.map(item => ({
      ...item,
      status: 'PUBLISHED',
      id: item.slug
    }));
  }
};

export const getArticleBySlug = async (slug: string, includeDrafts: boolean = false): Promise<ArticleEntry | null> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      // Fallback to static data
      const staticMatch = articlesData.find(a => a.slug === slug);
      if (staticMatch) {
        return {
          ...staticMatch,
          status: 'PUBLISHED',
          id: staticMatch.slug
        };
      }
      return null;
    }

    if (!includeDrafts && data.status === 'DRAFT') {
      return null;
    }

    return {
      slug: data.slug,
      title: data.title,
      category: data.category || 'AI & Engineering',
      excerpt: data.excerpt || '',
      readTime: data.read_time || data.readTime || '5 min read',
      publishedDate: data.date || data.published_date || data.publishedDate || new Date().toISOString().split('T')[0],
      author: typeof data.author === 'string' ? JSON.parse(data.author) : (data.author || { name: 'Divyansh Chandra', role: 'AI & Automation Specialist' }),
      tags: data.tags || [],
      tableOfContents: data.table_of_contents || data.tableOfContents || [],
      content: data.content || '',
      status: data.status || 'PUBLISHED',
      id: data.id
    } as ArticleEntry;
  } catch (err) {
    console.error("Failed to fetch article by slug from Supabase:", err);
    const staticMatch = articlesData.find(a => a.slug === slug);
    if (staticMatch) {
      return {
        ...staticMatch,
        status: 'PUBLISHED',
        id: staticMatch.slug
      };
    }
    return null;
  }
};
