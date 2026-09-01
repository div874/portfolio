import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const highlights = [
  { value: '10,000+', label: 'Keywords Researched' },
  { value: '15+', label: 'Projects Worked On' },
  { value: '10+', label: 'Campaigns & Content' },
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
                I work at the intersection of AI, marketing, and automation — building systems that make digital growth smarter and more scalable.
              </ScrollReveal>
            </div>

            <div className="about-body">
              <p>
                My work combines SEO, content strategy, marketing automation, Python, analytics, and generative AI to solve real-world marketing and business problems. From researching thousands of keywords and developing scalable content systems to building AI applications and automated reporting workflows, I focus on turning ideas into practical solutions.
              </p>
              <p>
                Currently, I'm building AI-powered content and SEO workflows for <strong style={{ color: 'var(--text-primary)' }}>1page.info</strong> across <strong style={{ color: 'var(--accent-color)' }}>12+ industry verticals</strong>, working on content generation, keyword-driven internal linking, optimization, and visual content systems.
              </p>
              <p>
                With 3+ internships and hands-on projects across AI, digital marketing, SEO, automation, and technology, I'm developing a multidisciplinary profile focused on using AI and technology to build, automate, and grow.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
