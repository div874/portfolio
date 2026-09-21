'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { getJournals } from '../utils/journals';
import type { JournalEntry } from '../utils/journals';
import LearningComparison from '../components/LearningComparison';

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
  
  const relatedEntries = allEntries
    .filter(e => e.category === entry.category && e.id !== entry.id)
    .slice(0, 3);

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
            <span className="editorial-article-date">{entry.date} &middot; {entry.readingTime || '5 min read'}</span>
          </div>
          
          <h1 className="editorial-article-title">{entry.title}</h1>
          
          {entry.image && (
            <img src={entry.image} alt={entry.title} width="800" height="500" fetchPriority="high" className="editorial-article-image" />
          )}

          <div className="journal-content editorial-markdown">
            <ReactMarkdown components={MarkdownComponents}>
              {entry.content}
            </ReactMarkdown>
          </div>

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

          {/* More From Category */}
          {relatedEntries.length > 0 && (
            <section className="related-entries">
              <h3 className="related-entries-title">MORE FROM {entry.category?.toUpperCase()}</h3>
              <ul className="related-list">
                {relatedEntries.map(related => (
                  <li key={related.id}>
                    <Link href={`/journey/${related.slug}`}>&rarr; {related.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

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
