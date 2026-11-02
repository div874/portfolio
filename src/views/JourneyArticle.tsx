'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getJournals } from '../utils/journals';
import type { JournalEntry } from '../utils/journals';
import LearningComparison from '../components/LearningComparison';
import { AttachmentList } from '../components/AttachmentList';
import { FileText, ExternalLink } from 'lucide-react';

interface JourneyArticleProps {
  initialEntry?: JournalEntry | null;
  initialAllEntries?: JournalEntry[];
}

const JourneyArticle = ({ initialEntry = null, initialAllEntries = [] }: JourneyArticleProps) => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [entry, setEntry] = useState<JournalEntry | null>(initialEntry);
  const [allEntries, setAllEntries] = useState<JournalEntry[]>(initialAllEntries);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (!initialEntry || initialAllEntries.length === 0) {
      const fetchData = async () => {
        const entries = await getJournals();
        setAllEntries(entries);
        if (slug) {
          const found = entries.find(e => e.slug === slug);
          if (found) {
            setEntry(found);
          } else {
            router.push('/journey');
          }
        }
      };
      fetchData();
    }
  }, [slug, initialEntry, initialAllEntries.length, router]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setReadingProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!entry) return null;

  const currentIndex = allEntries.findIndex(e => e.id === entry.id);
  const previousEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
  const nextEntry = currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;
  
  const categoryRelated = allEntries
    .filter(e => e.category === entry.category && e.id !== entry.id);

  // If fewer than 3 in same category, pull in other popular articles so there are always recommended links
  const otherPopular = allEntries
    .filter(e => e.id !== entry.id && !categoryRelated.some(c => c.id === e.id));
  
  const relatedEntries = [...categoryRelated, ...otherPopular].slice(0, 4);

  // Custom components for Markdown rendering
  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      if (!inline && match && match[1] === 'learning-comparison') {
        return <LearningComparison data={String(children).replace(/\n$/, '')} />;
      }
      return <code className={className} {...props}>{children}</code>;
    }
  };

  return (
    <motion.div
      className="page-container editorial-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Reading Progress Indicator */}
      <div className="reading-progress-container hidden-mobile">
        <div className="reading-progress-bar" style={{ transform: `scaleY(${readingProgress})` }} />
      </div>

      <div className="editorial-paper">
        <div className="editorial-margin-line" />
        
        <div className="editorial-content">
          <Link href="/journey" className="editorial-back-btn">&larr; BACK TO JOURNAL</Link>
          
          <div className="editorial-article-meta">
            <span className="editorial-article-tag">[ {entry.category} ]</span>
            {entry.status === 'DRAFT' && (
              <span style={{ background: '#fff3cd', color: '#856404', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                DRAFT PREVIEW
              </span>
            )}
            <span className="editorial-article-date">{entry.date} &middot; {entry.readingTime || '5 min read'}</span>
          </div>
          
          <h1 className="editorial-article-title">{entry.title}</h1>
          
          {entry.image && (
            entry.image.match(/\.(pdf|ppt|pptx|doc|docx)$/i) ? (
              <div style={{
                margin: '20px 0',
                padding: '16px 20px',
                borderRadius: '10px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={24} color="#2563eb" />
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>Attached Featured Document</span>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#1e293b' }}>{entry.image.split('/').pop()}</p>
                  </div>
                </div>
                <a
                  href={entry.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    background: '#2563eb',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  <ExternalLink size={14} /> Open Document
                </a>
              </div>
            ) : (
              <img src={entry.image} alt={entry.title} width="800" height="500" fetchPriority="high" className="editorial-article-image" />
            )
          )}

          <div className="journal-content editorial-markdown">
            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={MarkdownComponents}>
              {entry.content}
            </ReactMarkdown>
          </div>

          {/* Attached Presentations, Whitepapers & Documents */}
          {entry.attachments && entry.attachments.length > 0 && (
            <AttachmentList
              attachments={entry.attachments}
              title="Attached Presentations, Whitepapers & Documents"
            />
          )}

          <hr className="editorial-divider" />

          {/* Learning Trail */}
          {(previousEntry || nextEntry) && (
            <section className="learning-trail">
              <h3 className="learning-trail-title">LEARNING TRAIL</h3>
              <div className="learning-trail-links">
                <div className="trail-link-container prev-trail">
                  {previousEntry && (
                    <Link href={`/journey/${previousEntry.slug}`} className="trail-link">
                      <span className="trail-label">&larr; PREVIOUS</span>
                      <span className="trail-text">{previousEntry.title}</span>
                    </Link>
                  )}
                </div>
                <div className="trail-link-container next-trail">
                  {nextEntry && (
                    <Link href={`/journey/${nextEntry.slug}`} className="trail-link">
                      <span className="trail-label">NEXT &rarr;</span>
                      <span className="trail-text">{nextEntry.title}</span>
                    </Link>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* More Articles & Related Reading */}
          {relatedEntries.length > 0 && (
            <section className="related-entries" style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #eee' }}>
              <h3 className="related-entries-title" style={{ fontSize: '0.85rem', letterSpacing: '1.5px', color: '#666', marginBottom: '14px' }}>
                RECOMMENDED READING & RELATED INSIGHTS
              </h3>
              <ul className="related-list" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {relatedEntries.map(related => (
                  <li key={related.id}>
                    <Link href={`/journey/${related.slug}`} style={{ color: '#111', textDecoration: 'none', fontWeight: 600, fontSize: '0.98rem' }}>
                      &rarr; {related.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Cross-Silo: Relevant Engineering & Case Studies */}
          <section style={{ marginTop: '28px', padding: '18px 20px', borderRadius: '10px', background: '#f9f9f9', border: '1px solid #e8e8e8' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#666', letterSpacing: '1px', textTransform: 'uppercase' }}>
              EXPLORE CASE STUDIES & ENGINEERING WORK
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <Link href="/case-studies/b2b-seo-ai-traffic-growth" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 600 }}>
                • SEO & AI Automation: Scaling B2B Organic Traffic by 240% (Case Study)
              </Link>
              <Link href="/projects/wallcurry-ai-recommendation" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 600 }}>
                • Wallcurry AI Recommendation Engine (ResNet-50 & FAISS)
              </Link>
              <Link href="/projects/brand-sutra" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 600 }}>
                • Brand Sutra - AI Brand Governance & Content Review Platform
              </Link>
            </div>
          </section>

          <div className="article-share">
            <button className="share-btn" onClick={() => navigator.clipboard.writeText(window.location.href)}>
              Copy link
            </button>
            <span>&middot;</span>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noreferrer" className="share-btn">
              LinkedIn
            </a>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default JourneyArticle;
