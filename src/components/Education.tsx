import { motion } from 'framer-motion';

const educationList = [
  {
    institution: "SVKM's NMIMS",
    degree: 'Integrated B.Tech, Computer Science & Engineering',
    period: '2022 – 2027',
    details: 'Currently pursuing an integrated dual degree combining technology with business management.'
  },
  {
    institution: 'Holy Cross Senior Secondary School, Byron Bazar, Raipur',
    degree: 'Senior Secondary (XII), CBSE – Science',
    period: '2022',
    details: 'Graduated with 72.00%'
  },
  {
    institution: 'Holy Cross Senior Secondary School, Byron Bazar, Raipur',
    degree: 'Secondary (X), CBSE',
    period: '2020',
    details: 'Graduated with 88.40%'
  }
];

const Education = () => {
  return (
    <section className="section" id="education">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '50px' }}
      >
        <span className="section-label">05</span>
        <h2 className="accent-text" style={{ fontSize: '3rem' }}>Education</h2>
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
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '1.3rem', flex: 1, minWidth: '200px', lineHeight: 1.3, textTransform: 'none', letterSpacing: 'normal', fontWeight: 700 }}>{edu.degree}</h3>
              <span style={{
                color: 'var(--accent-color)',
                fontWeight: 600,
                fontSize: '0.85rem',
                padding: '4px 14px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                borderRadius: '20px',
                whiteSpace: 'nowrap'
              }}>
                {edu.period}
              </span>
            </div>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '12px', fontSize: '1rem', fontWeight: 400, textTransform: 'none', letterSpacing: 'normal' }}>{edu.institution}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{edu.details}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
