import JourneyArticle from '@/views/JourneyArticle';
import { getJournals, getJournalBySlug } from '@/utils/journals';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const journals = await getJournals();
    return (journals || []).map(j => ({ slug: j.slug }));
  } catch (err) {
    console.error("Failed to generate static params for journals:", err);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getJournalBySlug(slug);
  if (!entry) return { title: 'Article Not Found' };

  const pageUrl = `https://www.divyanshchandra.online/journey/${slug}`;
  const cleanExcerpt = entry.excerpt || entry.title;

  return {
    title: entry.title,
    description: cleanExcerpt,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${entry.title} | Divyansh Chandra`,
      description: cleanExcerpt,
      url: pageUrl,
      type: 'article',
      images: entry.image ? [entry.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: cleanExcerpt,
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
