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
            whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.4)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="about-stat__value">{item.value}</span>
            <span className="about-stat__label">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="about-grid">
        {/* Left column — Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{
            padding: '24px',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            maxWidth: '320px',
            width: '100%',
            margin: '0 auto',
            border: '1px solid var(--glass-border)'
          }}
        >
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            width: '100%',
            aspectRatio: '1/1'
          }}>
            <img 
              src="/profile.png" 
              alt="Divyansh Chandra" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} 
            />
            {/* Subtle gradient overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, transparent 70%, rgba(5,5,5,0.8) 100%)',
              pointerEvents: 'none'
            }} />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: '1.35rem', 
              color: 'var(--text-primary)', 
              margin: 0, 
              textTransform: 'none',
              fontWeight: 700,
              letterSpacing: '-0.3px',
              fontFamily: '"Outfit", sans-serif'
            }}>
              Divyansh Chandra
            </h3>
          </div>
        </motion.div>

        {/* Right column — content */}
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
