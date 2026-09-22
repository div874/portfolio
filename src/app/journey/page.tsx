import JourneyPage from '@/views/JourneyPage';
import { getJournals } from '@/utils/journals';
import { supabase } from '@/supabase';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal | Divyansh Chandra',
  description: "Things I'm learning, building, breaking, and finally understanding.",
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
