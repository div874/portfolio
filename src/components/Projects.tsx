import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

const projectColors = [
  'linear-gradient(135deg, #52525b 0%, #3f3f46 100%)',
  'linear-gradient(135deg, #71717a 0%, #52525b 100%)',
  'linear-gradient(135deg, #3f3f46 0%, #ec4899 100%)',
];

const projectsData = [
  {
    title: 'Wallcurry AI Recommendation Model',
    category: 'AI & Recommendation Systems',
    problem: 'Art platform with 10K+ mural listings; users couldn\'t discover works matching their taste. Manual curation didn\'t scale.',
    solution: 'Built ML-powered recommendation engine using ResNet-50 for visual feature extraction, 512-dim embeddings, and collaborative filtering with user behavior tracking.',
    impact: [
      'Improved recommendation accuracy from 72% → 88% (user feedback validation)',
      '30% increase in mural purchases post-recommendations',
      '45% of users now discovering content via recommendations'
    ],
    tags: ['Python', 'TensorFlow', 'FAISS', 'Flask', 'React'],
    image: '/project_1.png',
    links: { live: '#', code: '#' }
  },
  {
    title: 'SEO Reporting Automation Dashboard',
    category: 'Data Engineering & Growth',
    problem: 'Manual SEO reporting took 6 hours/week across 3 client accounts. Reports were inconsistent and delayed.',
    solution: 'Automated dashboard pulling data from Google Search Console & GA4 APIs. Python pipeline aggregating data, calculating MoM trends, auto-generating PDF reports emailed to clients every Monday.',
    impact: [
      'Reduced reporting time from 6 hours → 15 minutes per week',
      'Tracked 45+ keywords across 3 accounts in real-time',
      'Identified 8 drop-off issues proactively (before clients noticed)',
      'Client satisfaction: 4.9/5 for faster, consistent reporting'
    ],
    tags: ['Python', 'Google APIs', 'Pandas', 'Flask', 'Automation'],
    image: '/project_2.png',
    links: { live: '#', code: '#' }
  },
  {
    title: 'Customer Complaint Auto Resolver',
    category: 'NLP & Machine Learning',
    problem: 'Support team received 200+ complaints/day in 3 languages. Manual triage took 4 hours/day, and resolution time averaged 8 hours per complaint.',
    solution: 'End-to-end NLP pipeline: XLM-RoBERTa for multilingual classification, Sentence-BERT for entity extraction, FAISS semantic search for similar resolved complaints → auto-suggest solutions.',
    impact: [
      'Resolved 35% of complaints automatically (matching to past solutions)',
      'Reduced manual triage time from 4 hours → 30 minutes/day',
      'Average resolution time: 8 hours → 2 hours',
      'Support team satisfaction: 4.7/5 (less tedious work)'
    ],
    tags: ['Python', 'Hugging Face', 'FAISS', 'Flask', 'React'],
    image: '/project_3.png',
    links: { live: '#', code: '#' }
  }
];

const Projects = () => {
  return (
    <section className="section" id="projects" style={{ padding: '100px 10%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'left', marginBottom: '60px' }}
      >
        <span className="section-label">03</span>
        <h2 className="accent-text" style={{ fontSize: '3rem', marginBottom: '20px' }}>Selected Work</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '600px' }}>Each project follows a Problem → Solution → Impact framework. Real metrics, real outcomes.</p>
      </motion.div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {projectsData.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="project-row"
            style={{ display: 'flex', flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', gap: '50px', alignItems: 'stretch', flexWrap: 'wrap' }}
          >
            {/* Visual card */}
            <div className="project-image-wrapper" style={{ flex: '1 1 380px', overflow: 'hidden', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative', minHeight: '320px' }}>
              <div 
                className="project-image-fallback"
                style={{ 
                  background: projectColors[index % projectColors.length],
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  padding: '40px'
                }}
              >
                <span style={{ fontSize: '5rem', fontWeight: 800, color: 'rgba(255,255,255,0.12)', fontFamily: '"Outfit", sans-serif', lineHeight: 1 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600 }}>
                  {project.category}
                </span>
              </div>
              <img 
                src={project.image} 
                alt={project.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease', position: 'relative', zIndex: 1 }} 
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            
            {/* Content */}
            <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{project.category}</span>
              <h3 style={{ fontSize: '1.7rem', color: 'var(--text-primary)', lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal', fontWeight: 700 }}>{project.title}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Problem:</strong> {project.problem}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Solution:</strong> {project.solution}
                </p>
              </div>

              {/* Impact metrics */}
              <div style={{ marginTop: '4px' }}>
                <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Impact:</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {project.impact.map((metric, i) => (
                    <li key={i} style={{ color: 'var(--accent-color)', fontSize: '0.9rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ flexShrink: 0, marginTop: '2px' }}>✦</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                {project.tags.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                <a href={project.links.code} className="project-link">
                  <FaGithub size={18} /> Source Code
                </a>
                <a href={project.links.live} className="project-link">
                  <ExternalLink size={18} /> Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginTop: '80px', textAlign: 'center' }}
      >
        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '24px' }}>Interested in similar work?</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#contact" className="glow-button" style={{ textDecoration: 'none' }}>Contact Me</a>
          <a href="https://github.com/div874" target="_blank" rel="noopener noreferrer" className="social-icon-link" style={{ width: 'auto', padding: '0 20px', borderRadius: '30px', display: 'flex', gap: '8px' }}>
            <FaGithub size={18} /> Explore GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
