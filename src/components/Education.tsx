'use client';

import { motion } from 'framer-motion';

const educationList = [
  {
    institution: "SVKM's NMIMS, Navi Mumbai",
    degree: 'MBA.Tech Computer Engineering',
    period: 'Expected 2027',
    details: 'CGPA: 3.10/4 (As per Sem 8). Dual-degree program combining rigorous Computer Engineering foundations with Technology Management.'
  },
  {
    institution: 'Holy Cross Higher Secondary School, Raipur',
    degree: 'Senior Secondary (XII), CBSE',
    period: '2022',
    details: 'Graduated with 71.50%'
  },
  {
    institution: 'Holy Cross Higher Secondary School, Raipur',
    degree: 'Secondary (X), CBSE',
    period: '2020',
    details: 'Graduated with 88.40%'
  }
];

const Education = () => {
  return (
    <section className="section" id="education" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '40px' }}
      >
        <span className="section-label">05</span>
        <h2 className="accent-text" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.2rem)' }}>Education</h2>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '860px' }}>
        {educationList.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card"
            style={{ padding: '24px 28px', borderRadius: '16px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '1.25rem', flex: 1, minWidth: '200px', lineHeight: 1.3, textTransform: 'none', letterSpacing: 'normal', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                {edu.degree}
              </h3>
              <span style={{
                color: 'var(--accent-color)',
                fontWeight: 600,
                fontSize: '0.85rem',
                padding: '4px 14px',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                borderRadius: '20px',
                whiteSpace: 'nowrap'
              }}>
                {edu.period}
              </span>
            </div>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.95rem', fontWeight: 500, textTransform: 'none', letterSpacing: 'normal' }}>
              {edu.institution}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
              {edu.details}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
