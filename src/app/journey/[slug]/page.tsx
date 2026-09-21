import JourneyArticle from '@/views/JourneyArticle';
import { getJournals, getJournalBySlug } from '@/utils/journals';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
  const journals = await getJournals();
  return journals.map(j => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getJournalBySlug(slug);
  if (!entry) return { title: 'Article Not Found' };

  return {
    title: `${entry.title} | Divyansh Chandra Journal`,
    description: entry.excerpt || entry.title,
    openGraph: {
      title: entry.title,
      description: entry.excerpt || entry.title,
      images: entry.image ? [entry.image] : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getJournalBySlug(slug);
  if (!entry) notFound();

  const allEntries = await getJournals();

  return <JourneyArticle initialEntry={entry} initialAllEntries={allEntries} />;
}
