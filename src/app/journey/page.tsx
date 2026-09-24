import JourneyPage from '@/views/JourneyPage';
import { getJournals } from '@/utils/journals';
import { supabase } from '@/supabase';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal & Case Studies',
  description: 'Things I am learning, building, breaking, and understanding. Case studies on marketing strategy, FMCG dynamics, AI recommendation engines, and automation.',
  alternates: {
    canonical: 'https://www.divyanshchandra.online/journey',
  },
  openGraph: {
    title: 'Journal & Case Studies | Divyansh Chandra',
    description: 'Insights and breakdowns on AI models, marketing strategy, FMCG competitive dynamics, and growth engineering.',
    url: 'https://www.divyanshchandra.online/journey',
  },
};

export const revalidate = 60;

export default async function Page() {
  const entries = await getJournals();
  let categories: any[] = [];
  try {
    const { data } = await supabase.from('categories').select('*').order('name');
    if (data) {
      categories = data;
    }
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }

  return <JourneyPage initialEntries={entries || []} initialCategories={categories} />;
}
