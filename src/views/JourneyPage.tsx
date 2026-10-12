'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getJournals } from '../utils/journals';
import type { JournalEntry } from '../utils/journals';
import type { Category } from './AdminDashboard';
import { supabase } from '../supabase';
import Folder from '../components/Folder';

interface JourneyPageProps {
  initialEntries?: JournalEntry[];
  initialCategories?: Category[];
}

// Unified theme folder color: Classic warm Manila Kraft stationery that suits the editorial notebook paper theme
const THEME_FOLDER_COLOR = '#caa472';

const JourneyPage = ({ initialEntries = [], initialCategories = [] }: JourneyPageProps) => {
  const router = useRouter();
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    if (initialEntries.length === 0) {
      getJournals().then(setEntries);
    }
    
    if (initialCategories.length === 0) {
      const fetchCategories = async () => {
        const { data, error } = await supabase.from('categories').select('*').order('name');
        if (!error && data) {
          setCategories(data as Category[]);
        }
      };
      fetchCategories();
    }
  }, [initialEntries.length, initialCategories.length]);

  // Dynamically ensure all categories from DB and all categories present in entries are represented
  const categoryList: { id: string; name: string; description?: string }[] = [...categories];
  const knownNames = new Set(categories.map(c => c.name.toUpperCase()));

  entries.forEach((entry, idx) => {
    if (entry.category) {
      const upper = entry.category.toUpperCase();
      if (!knownNames.has(upper)) {
        knownNames.add(upper);
        categoryList.push({
          id: `entry-cat-${idx}`,
          name: upper,
          description: ''
        });
      }
    }
  });

  const filteredEntries = activeCategory === 'ALL' 
    ? entries 
    : entries.filter(e => e.category && e.category.trim().toUpperCase() === activeCategory.trim().toUpperCase());

  const isAll = activeCategory === 'ALL';
  const pinnedFeatured = isAll 
    ? (filteredEntries.find(e => e.tag?.toUpperCase() === 'FEATURED') || filteredEntries[0])
    : null;
  const featuredEntry = isAll ? pinnedFeatured : null;
  const listEntries = isAll ? filteredEntries.filter(e => e.id !== featuredEntry?.id) : filteredEntries;

  return (
    <motion.div
      className="page-container editorial-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="editorial-paper">
        {/* Print-only Cover Image */}
        <div className="print-only-cover" style={{ display: 'none' }}>
          <img src="/journal-cover.jpg" alt="Journal Cover" style={{ width: '100%', height: 'auto', pageBreakAfter: 'always' }} />
        </div>

        <div className="editorial-margin-line" />
        
        <div className="editorial-content">
          <header className="editorial-header">
            <h1 className="editorial-title">JOURNAL</h1>
            <p className="editorial-subtitle" style={{ minHeight: '50px' }}>
              {activeCategory === 'ALL' ? (
                <>Things I'm learning, building, breaking,<br/>and finally understanding.</>
              ) : (
                categoryList.find(c => c.name.toUpperCase() === activeCategory)?.description || ''
              )}
            </p>

            {/* Interactive Category Folders Shelf */}
            {categoryList.length > 0 && (
              <div className="category-folders-shelf">
                <div className="category-folders-shelf-header">
                  <div className="category-folders-shelf-left">
                    <span className="category-folders-shelf-title">
                      📁 Category Folders
                    </span>
                    {activeCategory !== 'ALL' && (
                      <span className="category-shelf-active-tag">
                        Filter: <strong>{activeCategory}</strong>
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => setActiveCategory('ALL')}
                    className={`category-shelf-all-btn ${activeCategory === 'ALL' ? 'active' : ''}`}
                    title="Show all journal entries"
                  >
                    {activeCategory === 'ALL' ? `[ ALL JOURNALS · ${entries.length} ]` : `[ VIEW ALL JOURNALS ]`}
                  </button>
                </div>

                <div className="category-folders-grid">
                  {categoryList.map(cat => {
                    const catUpper = cat.name.trim().toUpperCase();
                    const catEntries = entries.filter(e => e.category && e.category.trim().toUpperCase() === catUpper);
                    const folderItems = (catEntries.length > 0 
                      ? catEntries 
                      : [{ title: 'Empty Folder', excerpt: 'No journals yet in this category', slug: '', date: '', category: cat.name, status: '', readingTime: '', tag: '', image: '', tags: [], content: '', id: 'empty' }]
                    )
                      .slice(0, 6)
                      .map((e: JournalEntry) => ({
                        title: e.title,
                        description: e.excerpt ? (e.excerpt.slice(0, 75) + '...') : (e.date ? `${e.date} · 3 min read` : ''),
                        image: e.image || undefined
                      }));

                    const isActive = activeCategory === catUpper;

                    return (
                      <div 
                        key={cat.id} 
                        className={`category-folder-wrapper ${isActive ? 'active' : ''}`}
                        onClick={(e) => {
                          const target = e.target as HTMLElement;
                          if (target.closest('.folder-item')) return;
                          setActiveCategory(activeCategory === catUpper ? 'ALL' : catUpper);
                        }}
                      >
                        <Folder
                          color={THEME_FOLDER_COLOR}
                          size={0.55}
                          variant="glass"
                          mode="flap"
                          theme="light"
                          peek={false}
                          closeOnOutsideClick={false}
                          items={folderItems}
                          open={isActive}
                          onOpenChange={(isOpen) => {
                            if (isOpen) {
                              setActiveCategory(catUpper);
                            } else if (activeCategory === catUpper) {
                              setActiveCategory('ALL');
                            }
                          }}
                          onItemClick={(_item, index) => {
                            const target = catEntries[index];
                            if (target?.slug) {
                              router.push(`/journey/${target.slug}`);
                            }
                          }}
                        />
                        <div className="category-folder-info">
                          <button
                            className="category-folder-title-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCategory(activeCategory === catUpper ? 'ALL' : catUpper);
                            }}
                            title={`Filter by ${cat.name}`}
                          >
                            {cat.name}
                          </button>
                          <span className="category-folder-count">
                            {catEntries.length} {catEntries.length === 1 ? 'journal' : 'journals'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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
              {featuredEntry && (
                <section className="editorial-featured">
                  <div className="editorial-section-label">FEATURED</div>
                  
                  <Link href={`/journey/${featuredEntry.slug}`} className="editorial-featured-card">
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
                        <img src={featuredEntry.image} alt={featuredEntry.title} loading="lazy" width="600" height="400" />
                      ) : (
                        <div className={`visual-placeholder theme-${featuredEntry.category.toLowerCase().replace(/[^a-z]/g, '')}`}>
                          {/* We can use CSS to style this nicely based on category */}
                        </div>
                      )}
                    </div>
                  </Link>
                </section>
              )}

              {filteredEntries.length === 0 ? (
                <div style={{ padding: '50px 0', textAlign: 'center', color: '#888' }}>
                  <p style={{ fontSize: '1.05rem', marginBottom: '8px' }}>
                    No entries found in <strong>{activeCategory}</strong> yet.
                  </p>
                  <button 
                    onClick={() => setActiveCategory('ALL')}
                    style={{
                      marginTop: '12px',
                      padding: '7px 16px',
                      background: '#111',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.8rem'
                    }}
                  >
                    View All Journals
                  </button>
                </div>
              ) : listEntries.length > 0 && (
                <section className="editorial-recent">
                  <div className="editorial-recent-header">
                    <div className="editorial-section-label">
                      {isAll ? 'RECENT ENTRIES' : `ENTRIES IN ${activeCategory}`}
                    </div>
                    <span className="editorial-recent-count">
                      {listEntries.length} {listEntries.length === 1 ? 'entry' : 'entries'}
                    </span>
                  </div>

                  <div className="editorial-recent-list">
                    {listEntries.map(entry => {
                      const isLearningStatus = entry.status && ['LEARNING', 'BUILDING', 'UNDERSTOOD', 'REVISITING'].includes(entry.status.toUpperCase());
                      const displayTags = entry.tags && entry.tags.length > 0 ? entry.tags.slice(0, 3) : [];
                      const extraTagsCount = entry.tags ? Math.max(0, entry.tags.length - 3) : 0;

                      return (
                        <Link 
                          key={entry.id} 
                          href={`/journey/${entry.slug}`} 
                          className="editorial-recent-item"
                        >
                          <div className="recent-meta-left">
                            <span className="recent-date">{entry.date}</span>
                            {isLearningStatus ? (
                              <span className={`recent-status-pill ${entry.status.toLowerCase()}`}>
                                {entry.status === 'UNDERSTOOD' ? '✓ ' : '● '}
                                {entry.status}
                              </span>
                            ) : entry.category ? (
                              <span className="recent-category-badge">{entry.category}</span>
                            ) : null}
                          </div>

                          <div className="recent-content">
                            <h3 className="recent-title">{entry.title}</h3>
                            {(displayTags.length > 0 || entry.readingTime) && (
                              <div className="recent-tags-row">
                                {displayTags.map((tag, i) => (
                                  <span key={i} className="recent-tag-pill">#{tag}</span>
                                ))}
                                {extraTagsCount > 0 && (
                                  <span className="recent-tag-more">+{extraTagsCount}</span>
                                )}
                                {entry.readingTime && (
                                  <span className="recent-reading-time">&middot; {entry.readingTime}</span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="recent-arrow-wrap" aria-hidden="true">
                            <span className="recent-arrow">&rarr;</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
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
