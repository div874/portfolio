import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const highlights = [
  { value: '200+', label: 'Keywords Researched' },
  { value: '35%', label: 'Avg. Traffic Lift' },
  { value: '50+', label: 'Pages Audited' },
  { value: '3+', label: 'Internships' },
];

const About = () => {
  return (
    <section className="section" id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '40px' }}
      >
        <span className="section-label">01</span>
        <h2 className="accent-text" style={{ fontSize: '3rem' }}>About Me</h2>
      </motion.div>

      {/* By The Numbers — dashboard-style metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="stats-row"
      >
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            className="about-stat glass-card"
            whileHover={{ scale: 1.05, borderColor: 'rgba(82, 82, 91, 0.4)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="about-stat__value">{item.value}</span>
            <span className="about-stat__label">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="about-grid">
        {/* Left column — Mascot Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/about_mascot.png" 
            alt="Coding Mascot" 
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.06))'
            }} 
          />
        </motion.div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="about-content"
          >
            <div className="about-lead" style={{ borderBottom: 'none', paddingBottom: '0', marginBottom: '20px' }}>
              <ScrollReveal
                baseOpacity={0.1}
                enableBlur={true}
                baseRotation={3}
                blurStrength={4}
                textClassName="about-lead-text"
              >
                I'm a data-driven marketer specializing in organic growth, marketing automation, and AI-powered content systems. My approach combines keyword research and technical SEO with Python automation and analytics to deliver measurable results.
              </ScrollReveal>
            </div>

            <div className="about-body">
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Recent Focus:</strong> Building scalable content pipelines for 1page.info across <strong style={{ color: 'var(--accent-color)' }}>12 industry verticals</strong> (healthcare, food & agriculture, metal/steel, education). Implemented AI-powered content generation with sub-20% AI detection scores, internal linking via keyword registries, and image placement logic optimizing for visual engagement.
              </p>
              <p>
                I'm an <strong style={{ color: 'var(--text-primary)' }}>MBA Tech student</strong> (graduating 2027) with 3+ internships applying these frameworks across diverse industries. I learn fast and love solving problems at the intersection of marketing and engineering.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
