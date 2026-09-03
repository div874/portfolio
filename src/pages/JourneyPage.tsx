import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import frontMatter from 'front-matter';

const markdownFiles = import.meta.glob('../content/journals/*.md', { query: '?raw', import: 'default' });

interface JournalEntry {
  title: string;
  date: string;
  tag: string;
  image: string;
  tags: string;
  content: string;
  id: string;
}

const pageVariants = {
  initial: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    transformOrigin: 'left center'
  }),
  animate: {
    rotateY: 0,
    opacity: 1,
    transformOrigin: 'left center',
    transition: { duration: 0.6, ease: [0.64, 0.04, 0.35, 1] as const } // smooth ease in out
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0,
    transformOrigin: 'left center',
    transition: { duration: 0.6, ease: [0.64, 0.04, 0.35, 1] as const }
  })
};

const JourneyPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchJournals = async () => {
      const loadedEntries: JournalEntry[] = [];
      for (const path in markdownFiles) {
        const rawContent = await markdownFiles[path]();
        const { attributes, body } = frontMatter<Record<string, string>>(rawContent as string);
        loadedEntries.push({
          title: attributes.title || 'Untitled',
          date: attributes.date || '',
          tag: attributes.tag || 'Journal',
          image: attributes.image || '',
          tags: attributes.tags || '',
          content: body || '',
          id: path
        });
      }
      // Sort entries so the newest (highest date/id) is first
      setEntries(loadedEntries.sort((a, b) => b.id.localeCompare(a.id)));
    };

    fetchJournals();
  }, []);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => prev + newDirection);
  };

  const currentEntry = entries[currentIndex];

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{ 
        minHeight: '100vh', 
        paddingTop: '120px', 
        paddingBottom: '120px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        position: 'relative', 
        gap: '40px',
        perspective: '1500px' // For the 3D flip effect
      }}
    >
      {/* Normal View - Hidden during print */}
      <div className="no-print" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
        {entries.length > 0 && (
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div 
              key={currentIndex}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                width: '95vw',
                maxWidth: '1000px',
                minHeight: '500px',
                backgroundColor: '#fff',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.05)',
                borderRadius: '2px 8px 8px 2px',
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e0e0e0 31px, #e0e0e0 32px)',
                borderLeft: '4px solid rgba(0, 0, 0, 0.1)',
                padding: '32px 40px 32px 60px',
                position: 'relative',
                color: '#333'
              }}
            >
              {/* Top Right Corner Image */}
              {currentEntry.image && (
                <img 
                  src={currentEntry.image} 
                  alt={currentEntry.title} 
                  style={{
                    position: 'absolute',
                    top: '25px',
                    right: '35px',
                    width: '280px',
                    maxWidth: '35%',
                    zIndex: 1,
                    opacity: 0.9,
                    pointerEvents: 'none',
                    transform: 'rotate(5deg)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    borderRadius: '8px'
                  }}
                />
              )}

              {/* Bookmark tab */}
              <div 
                style={{
                  position: 'absolute',
                  top: '-35px',
                  right: '60px',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  padding: '8px 24px',
                  borderRadius: '6px 6px 0 0',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  boxShadow: '0 -4px 10px rgba(0,0,0,0.05)',
                  zIndex: -1
                }}
              >
                {currentEntry.tag}
              </div>

              {/* Margin line */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '40px', width: '2px', backgroundColor: 'rgba(255, 100, 100, 0.3)' }} />
              
              <h1 style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '24px', margin: 0, padding: 0, lineHeight: '32px' }}>{currentEntry.title}</h1>
              <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '14px', color: '#666', margin: 0, padding: 0, lineHeight: '32px', fontStyle: 'italic' }}>
                {currentEntry.date}
              </div>
              {/* Empty line space */}
              <div style={{ height: '32px' }}></div>

              <div className="journal-content">
                <ReactMarkdown>{currentEntry.content}</ReactMarkdown>
                
                {currentEntry.tags && (
                  <p style={{ fontSize: '14px', color: '#888', fontStyle: 'italic' }}>
                    {currentEntry.tags}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination & Download Controls */}
        {entries.length > 0 && (
          <div style={{ display: 'flex', gap: '20px', zIndex: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={() => paginate(-1)}
              disabled={currentIndex === 0}
              className="glow-button"
              style={{ opacity: currentIndex === 0 ? 0.4 : 1, pointerEvents: currentIndex === 0 ? 'none' : 'auto' }}
            >
              &larr; Newer
            </button>
            
            <button 
              onClick={() => window.print()}
              className="glow-button"
              style={{ backgroundColor: '#ff6b6b', color: 'white', borderColor: '#ff6b6b' }}
            >
              &#128196; Download as Book (PDF)
            </button>

            <button 
              onClick={() => paginate(1)}
              disabled={currentIndex === entries.length - 1}
              className="glow-button"
              style={{ opacity: currentIndex === entries.length - 1 ? 0.4 : 1, pointerEvents: currentIndex === entries.length - 1 ? 'none' : 'auto' }}
            >
              Older &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Hidden Print Container */}
      <div className="print-only">
        <div className="print-cover">
          <img src="/journal-cover.jpg" alt="Journal Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        {entries.map((entry) => (
          <div key={entry.id} className="print-notebook-page">
            <div className="print-margin-line" />
            
            {/* Top Right Corner Image (optional for print, looks good!) */}
            {entry.image && (
              <img 
                src={entry.image} 
                alt={entry.title} 
                style={{
                  position: 'absolute',
                  top: '25px',
                  right: '35px',
                  width: '280px',
                  maxWidth: '35%',
                  zIndex: 1,
                  opacity: 0.9,
                  pointerEvents: 'none',
                  transform: 'rotate(5deg)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  borderRadius: '8px'
                }}
              />
            )}

            <h1>{entry.title}</h1>
            <div className="print-date">{entry.date}</div>
            
            <div style={{ height: '32px' }}></div>

            <div className="journal-content">
              <ReactMarkdown>{entry.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

    </motion.div>
  );
};

export default JourneyPage;
