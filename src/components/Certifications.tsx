import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const certs = [
  { title: 'Search Engine Optimization (SEO)', issuer: 'HubSpot Academy', date: 'Jan 2026 – Feb 2026' },
  { title: 'Digital Marketing Certification', issuer: 'Skillshop', date: 'Jan 2026 – Feb 2026' },
  { title: 'FDP Digital Marketing Professional', issuer: 'Infosys Springboard', date: 'Jan 2026' }
];

const extras = [
  { role: 'Community Service Director', org: 'Rotaract Club', date: '2024 – 2025' },
  { role: 'Volunteer', org: 'Robin Hood Army', date: 'Present' },
  { role: 'Core Member', org: 'Manthan Club', date: '2024 – 2025' }
];

const Certifications = () => {
  return (
    <section className="section" id="cv-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '60px' }}
      >
        <span className="section-label">06</span>
        <h2 className="accent-text" style={{ fontSize: '3rem', marginBottom: '16px' }}>Full CV Breakdown</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', marginBottom: '28px' }}>
          A deeper look into my certifications and extracurricular activities that shape my holistic approach to marketing and tech.
        </p>
        <a
          href="/Divyansh_Chandra_Resume.pdf"
          download="Divyansh_Chandra_Resume.pdf"
          className="glow-button"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
        >
          <span>Download PDF Resume</span>
          <Download size={16} />
        </a>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
        {/* Certifications */}
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--glass-border)', textTransform: 'none', letterSpacing: 'normal', fontWeight: 600 }}>Certifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {certs.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card"
                style={{ padding: '24px' }}
              >
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', marginBottom: '6px', textTransform: 'none', letterSpacing: 'normal', fontWeight: 600 }}>{cert.title}</h4>
                <p style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>{cert.issuer}</p>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{cert.date}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Extracurriculars */}
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid var(--glass-border)', textTransform: 'none', letterSpacing: 'normal', fontWeight: 600 }}>Extracurriculars</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {extras.map((extra, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card"
                style={{ padding: '24px' }}
              >
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', marginBottom: '6px', textTransform: 'none', letterSpacing: 'normal', fontWeight: 600 }}>{extra.role}</h4>
                <p style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>{extra.org}</p>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{extra.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
