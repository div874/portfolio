import Hero from '../components/Hero';
import About from '../components/About';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HomeProps {
  onConnectClick: () => void;
}

const expertiseData = [
  {
    icon: '📈',
    title: 'Data-Driven SEO Strategy',
    description: 'Validating high-intent search keywords, auditing content structures, and executing scalable organic growth frameworks.',
    tags: ['Keyword Research', 'Content Strategy', 'Competitor Teardowns']
  },
  {
    icon: '🤖',
    title: 'AI Content & Automation',
    description: 'Building LLM content generation pipelines with customized humanization rulesets and Python automated reporting scripts.',
    tags: ['Claude & OpenAI API', 'Python Automation', 'Humanization Pipelines']
  },
  {
    icon: '⚡',
    title: 'Technical SEO & Speed',
    description: 'Auditing site crawlability, schema markup, indexation health, and optimizing Core Web Vitals for maximum rankings.',
    tags: ['Core Web Vitals', 'Schema Markup', 'Site Audit']
  },
  {
    icon: '📊',
    title: 'Growth Analytics & GA4',
    description: 'Setting up custom GA4 tracking segments, analyzing user drop-off patterns, and optimizing conversion funnels.',
    tags: ['GA4 Advanced', 'Cohort Analysis', 'CRO Optimization']
  }
];

const featuredProjects = [
  {
    title: 'Wallcurry AI Recommendation Model',
    category: 'AI & Recommendation Engine',
    desc: 'Built an ML-powered recommendation engine using ResNet-50 visual feature extraction (512-dim embeddings) and collaborative filtering.',
    metric: '88% recommendation accuracy & 30% increase in mural purchases',
    tags: ['Python', 'TensorFlow', 'FAISS', 'React']
  },
  {
    title: 'SEO Reporting Automation Dashboard',
    category: 'Automation & Data Engineering',
    desc: 'Automated workflow pulling Search Console & GA4 API data to calculate MoM trends and generate client PDF reports automatically.',
    metric: 'Saved 6 hrs/week reporting time across 3 client accounts',
    tags: ['Python', 'Google APIs', 'Pandas', 'Flask']
  }
];

// Automatically discover all logo images in /public/logos/
const logoModules = import.meta.glob('/public/logos/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}', { eager: true, as: 'url' });

const clientLogos = Object.keys(logoModules).map(key => {
  const filename = key.split('/').pop() || '';
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const cleanName = nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  return {
    name: cleanName,
    logo: key.replace('/public', '')
  };
});

const Home = ({ onConnectClick }: HomeProps) => {
  return (
    <div className="page-home">
      {/* Hero Header */}
      <Hero onConnectClick={onConnectClick} />

      {/* About & Stats */}
      <About />

      {/* 1. Core Expertise Pillars Grid */}
      <section className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '40px' }}
        >
          <span className="section-label">SERVICES & SPECIALIZATION</span>
          <h2 className="accent-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Core Capabilities
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {expertiseData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card"
            >
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '10px', fontWeight: 700 }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '20px' }}>
                {item.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {item.tags.map(tag => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. Clients I've Worked With (Logos Only) */}
      <section className="section" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '40px', textAlign: 'center' }}
        >
          <span className="section-label">TRUSTED BY</span>
          <h2 className="accent-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Clients I've Worked With
          </h2>
        </motion.div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px',
          padding: '50px 30px'
        }}>
          {clientLogos.map((client, idx) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '275px',
                height: '100px',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }}
            >
              <img
                src={client.logo}
                alt={client.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const sibling = e.currentTarget.nextSibling as HTMLElement;
                  if (sibling) sibling.style.display = 'block';
                }}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
              />
              <span
                style={{
                  display: 'none',
                  fontSize: '1.25rem',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  color: 'var(--text-primary)',
                  textAlign: 'center'
                }}
              >
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '30px', textAlign: 'right' }}>
          <Link to="/experience" style={{ color: 'var(--accent-secondary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>
            View Full Experience & Campaign Timelines →
          </Link>
        </div>
      </section>

      {/* 3. Featured Projects Preview */}
      <section className="section" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="section-label">SELECTED WORK</span>
            <h2 className="accent-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Featured Projects
            </h2>
          </div>
          <Link to="/projects" className="glow-button" style={{ textDecoration: 'none', padding: '10px 20px', fontSize: '0.9rem' }}>
            Browse All Projects →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {featuredProjects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card"
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>
                {proj.category}
              </div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>
                {proj.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                {proj.desc}
              </p>
              
              <div className="impact-badge" style={{ marginBottom: '20px' }}>
                ⚡ {proj.metric}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {proj.tags.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Minimal Professional CTA Banner */}
      <section className="section" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.25)',
            textAlign: 'center',
            padding: '60px 30px',
            borderRadius: '24px'
          }}
        >
          <span className="section-label" style={{ opacity: 0.9 }}>LET'S COLLABORATE</span>
          <h2 style={{ fontFamily: '"Outfit", sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 800 }}>
            Ready to scale your organic search growth?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 36px', lineHeight: '1.7' }}>
            Whether you need data-driven SEO strategy, AI pipeline automation, or performance optimization, let's connect and build something impactful.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onConnectClick}
              className="glow-button"
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              Let's Connect
            </motion.button>

            <Link
              to="/cv"
              style={{
                padding: '14px 28px',
                borderRadius: '30px',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              Explore Full CV →
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
