import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticles } from '@/utils/articles';
import { ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Articles & Insights | Divyansh Chandra',
  description: 'In-depth articles and technical guides on AI, Retrieval-Augmented Generation (RAG), B2B SEO Strategy, Python Automation, and Growth Marketing Analytics.',
  alternates: {
    canonical: 'https://www.divyanshchandra.online/articles',
  },
  openGraph: {
    title: 'Articles & Guides | Divyansh Chandra',
    description: 'Educational articles and technical deep-dives on Generative AI, RAG, Technical SEO, and Marketing Analytics.',
    url: 'https://www.divyanshchandra.online/articles',
  },
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main className="page-articles" style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="content-wrapper" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <span className="section-label">Articles & Guides</span>
          <h1 className="accent-text" style={{ fontSize: '3rem', marginBottom: '16px', lineHeight: 1.15 }}>
            Technical Insights & Strategic Frameworks
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', lineHeight: 1.6 }}>
            Deep-dive tutorials, architecture breakdowns, and actionable guides on Generative AI, Technical SEO, Python Automation, and Data Analytics.
          </p>
        </div>

        {/* Articles List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {articles.map((article) => (
            <article 
              key={article.slug}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <span 
                  style={{
                    backgroundColor: 'rgba(168, 85, 247, 0.12)',
                    color: 'var(--accent-color, #a855f7)',
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {article.category}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} /> {article.readTime} • {article.publishedDate}
                </span>
              </div>

              <div>
                <h2 style={{ fontSize: '1.7rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 700 }}>
                  <Link href={`/articles/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {article.title}
                  </Link>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  {article.excerpt}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingTop: '10px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {article.tags.map(t => (
                    <span key={t} className="project-tag" style={{ fontSize: '0.78rem' }}>
                      #{t}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/articles/${article.slug}`}
                  style={{ textDecoration: 'none', color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}
