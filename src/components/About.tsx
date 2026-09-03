import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const highlights = [
  { value: '15+', label: 'Projects Built' },
  { value: '3+', label: 'Internships' },
  { value: '12+', label: 'Industry Verticals' },
  { value: '10,000+', label: 'Keywords Analyzed' },
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
            className="about-mascot"
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
                I work at the intersection of AI, automation, and digital marketing - building practical systems that make businesses smarter, faster, and more scalable.
              </ScrollReveal>
            </div>

            <div className="about-body">
              <p>
                My work combines Generative AI, Python, LLMs, automation, analytics, and digital marketing to solve real-world business problems. I've worked on everything from AI-powered applications and automated reporting systems to SEO, content strategy, and scalable marketing workflows.
              </p>
              <p>
                I enjoy turning repetitive processes into automated systems, connecting data with intelligent tools, and using technology to make marketing and business operations more efficient.
              </p>
              <p>
                Currently, I'm building AI-powered content and SEO workflows for <strong style={{ color: 'var(--text-primary)' }}>1page.info</strong> across <strong style={{ color: 'var(--accent-color)' }}>12+ industry verticals</strong>, working on content generation, keyword-driven internal linking, optimization, and visual content systems.
              </p>
              <p>
                With 3+ internships and hands-on projects across AI, automation, digital marketing, and technology, I'm building a multidisciplinary career focused on one thing: using technology to build better systems.
              </p>
            </div>

            <Link
              to="/about"
              style={{
                width: 'fit-content',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '24px',
                padding: '14px 32px',
                borderRadius: '50px',
                background: '#171717',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <span>More About My Journey</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
