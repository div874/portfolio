import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getJournals } from '../utils/journals';
import type { JournalEntry } from '../utils/journals';

const CATEGORIES = ['ALL', 'AI / LLMs', 'DEVELOPMENT', 'SEO', 'CAREER'];

const JourneyPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    getJournals().then(setEntries);
  }, []);

  const filteredEntries = activeCategory === 'ALL' 
    ? entries 
    : entries.filter(e => e.category.toUpperCase() === activeCategory);

  const featuredEntry = filteredEntries[0];
  const recentEntries = filteredEntries.slice(1);

  return (
    <motion.div
      className="page-container editorial-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="editorial-paper">
        <div className="editorial-margin-line" />
        
        <div className="editorial-content">
          <header className="editorial-header">
            <h1 className="editorial-title">JOURNAL</h1>
            <p className="editorial-subtitle">
              Things I'm learning, building, breaking,<br/>
              and finally understanding.
            </p>
            <div className="editorial-filters">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  className={`editorial-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  [ {cat} ]
                </button>
              ))}
            </div>
          </header>

          <hr className="editorial-divider" />

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="editorial-list-view"
            >
              {featuredEntry ? (
                <section className="editorial-featured">
                  <div className="editorial-section-label">FEATURED</div>
                  
                  <Link to={`/journey/${featuredEntry.slug}`} className="editorial-featured-card">
                    <div className="featured-card-content">
                      <div className="featured-card-tag">{featuredEntry.category}</div>
                      <h2 className="featured-card-title">{featuredEntry.title}</h2>
                      <div className="featured-card-meta">
                        {featuredEntry.date} &middot; {featuredEntry.readingTime || '5 min read'}
                      </div>
                      {featuredEntry.excerpt && (
                        <p className="featured-card-excerpt">{featuredEntry.excerpt}</p>
                      )}
                      <div className="read-more-btn">Read journal &rarr;</div>
                    </div>
                    {/* Illustration placeholder */}
                    <div className="featured-card-visual">
                      {featuredEntry.image ? (
                        <img src={featuredEntry.image} alt={featuredEntry.title} />
                      ) : (
                        <div className={`visual-placeholder theme-${featuredEntry.category.toLowerCase().replace(/[^a-z]/g, '')}`}>
                          {/* We can use CSS to style this nicely based on category */}
                        </div>
                      )}
                    </div>
                  </Link>
                </section>
              ) : (
                <div style={{ padding: '40px 0', color: '#888' }}>No entries found for this category.</div>
              )}

              {recentEntries.length > 0 && (
                <section className="editorial-recent">
                  <div className="editorial-section-label">RECENT ENTRIES</div>
                  <ul className="editorial-recent-list">
                    {recentEntries.map(entry => (
                      <li key={entry.id}>
                        <Link to={`/journey/${entry.slug}`} className="editorial-recent-item">
                          <div className="recent-status">
                            {entry.status && (
                              <span className={`status-indicator ${entry.status.toLowerCase()}`}>
                                {entry.status === 'LEARNING' && '● '}
                                {entry.status === 'BUILDING' && '● '}
                                {entry.status === 'UNDERSTOOD' && '✓ '}
                                {entry.status === 'REVISITING' && '↻ '}
                                {entry.status}
                              </span>
                            )}
                          </div>
                          <div className="recent-date">{entry.date}</div>
                          <div className="recent-body">
                            <span className="recent-title">{entry.title}</span>
                            <div className="recent-tags">{entry.tags.join(' · ')}</div>
                          </div>
                          <div className="recent-arrow">&rarr;</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </motion.div>
          </AnimatePresence>

          <section className="editorial-pdf-cta">
            <h3 className="pdf-cta-title">WANT THE WHOLE NOTEBOOK?</h3>
            <p className="pdf-cta-desc">Read through the entries online, or keep a copy of the journal.</p>
            <button 
              className="glow-button pdf-cta-btn"
              onClick={() => window.print()}
            >
              Download Journal as PDF
            </button>
          </section>

        </div>
      </div>
    </motion.div>
  );
};

export default JourneyPage;

