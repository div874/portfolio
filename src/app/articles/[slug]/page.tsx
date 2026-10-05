import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug } from '@/utils/articles';
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sp = searchParams ? await searchParams : {};
  const isPreview = sp.preview === 'true' || sp.preview === '1' || sp.draft === 'true';
  const article = await getArticleBySlug(slug, isPreview);
  if (!article) return {};

  return {
    title: `${article.title} | Articles`,
    description: article.excerpt,
    alternates: {
      canonical: `https://www.divyanshchandra.online/articles/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | Divyansh Chandra`,
      description: article.excerpt,
      url: `https://www.divyanshchandra.online/articles/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.author.name],
    },
  };
}

export default async function ArticleDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = searchParams ? await searchParams : {};
  const isPreview = sp.preview === 'true' || sp.preview === '1' || sp.draft === 'true';
  const article = await getArticleBySlug(slug, isPreview);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: 'https://www.divyanshchandra.online/',
    },
    datePublished: article.publishedDate,
    url: `https://www.divyanshchandra.online/articles/${article.slug}`,
    keywords: article.tags.join(', '),
  };

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="content-wrapper" style={{ maxWidth: '850px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Back Link */}
        <Link 
          href="/articles"
          style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', marginBottom: '32px' }}
        >
          <ArrowLeft size={16} /> Back to all articles
        </Link>

        {/* Header */}
        <header style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', color: 'var(--accent-color, #a855f7)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 600 }}>
              {article.category}
            </span>
            {article.status === 'DRAFT' && (
              <span style={{ backgroundColor: 'rgba(234, 179, 8, 0.2)', color: '#eab308', border: '1px solid rgba(234, 179, 8, 0.4)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 700 }}>
                DRAFT PREVIEW
              </span>
            )}
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} /> {article.readTime}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} /> Published: {article.publishedDate}
            </span>
          </div>

          <h1 className="accent-text" style={{ fontSize: '2.4rem', lineHeight: 1.25, marginBottom: '20px', fontWeight: 800 }}>
            {article.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent-color, #a855f7)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              DC
            </div>
            <div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>{article.author.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{article.author.role}</div>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        {article.tableOfContents && article.tableOfContents.length > 0 && (
          <nav 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '40px'
            }}
          >
            <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={16} style={{ color: 'var(--accent-color)' }} /> Table of Contents
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {article.tableOfContents.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`}
                    style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s ease' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Body */}
        <article 
          className="article-content"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {article.tags.map((t) => (
            <span key={t} className="project-tag" style={{ fontSize: '0.8rem' }}>
              #{t}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div 
          style={{
            marginTop: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '28px',
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', flexShrink: 0 }}>
            DC
          </div>
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '4px', fontWeight: 700 }}>Written by Divyansh Chandra</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              AI & Automation Specialist building Generative AI tools, Python automation pipelines, and data marketing engines.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
