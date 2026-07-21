import Education from '../components/Education';
import Certifications from '../components/Certifications';
import { motion } from 'framer-motion';

const CVPage = () => {
  return (
    <div className="page-cv" style={{ paddingTop: '100px' }}>
      <section className="section" style={{ paddingBottom: '20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">CURRICULUM VITAE</span>
          <h1 className="accent-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '16px' }}>
            Explore My Resume & Background
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', marginBottom: '30px' }}>
            A full breakdown of my academic journey, professional certifications, leadership roles, and verifiable skill set.
          </p>

          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="glow-button"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', padding: '14px 28px', fontSize: '1rem' }}
          >
            <span>Download Official Resume PDF 📄</span>
          </a>
        </motion.div>
      </section>

      <Education />
      <Certifications />
    </div>
  );
};

export default CVPage;
