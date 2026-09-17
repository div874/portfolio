import frontMatter from 'front-matter';

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
  id: string; // The file path for sorting
}

// Ensure glob is evaluated at build time
const markdownFiles = import.meta.glob('../content/journals/*.md', { query: '?raw', import: 'default' });

export const getJournals = async (): Promise<JournalEntry[]> => {
  const loadedEntries: JournalEntry[] = [];
  for (const path in markdownFiles) {
    const rawContent = await markdownFiles[path]();
    const { attributes, body } = frontMatter<Record<string, string>>(rawContent as string);
    
    // Extract slug from filename: "2026-09-03-ai-agents.md" -> "ai-agents"
    const filename = path.split('/').pop() || '';
    const slug = filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

    // Format date to MM.DD.YY if it's in YYYY-MM-DD
    let formattedDate = attributes.date || '';
    if (formattedDate.includes('-')) {
      const parts = formattedDate.split('-');
      if (parts.length === 3) {
        formattedDate = `${parts[1]}.${parts[2]}.${parts[0].slice(2)}`;
      }
    }

    const tagsArray = attributes.tags ? attributes.tags.split('·').map(t => t.trim()) : [];

    loadedEntries.push({
      slug,
      title: attributes.title || 'Untitled',
      date: formattedDate,
      category: attributes.category || 'JOURNAL',
      status: attributes.status || '',
      excerpt: attributes.excerpt || '',
      readingTime: attributes.readingTime || '',
      tag: attributes.tag || 'Journal',
      image: attributes.image || '',
      tags: tagsArray,
      content: body || '',
      id: path
    });
  }
  
  // Sort entries so the newest is first based on file path date prefix
  return loadedEntries.sort((a, b) => b.id.localeCompare(a.id));
};

export const getJournalBySlug = async (slug: string): Promise<JournalEntry | null> => {
  const journals = await getJournals();
  return journals.find(j => j.slug === slug) || null;
};
