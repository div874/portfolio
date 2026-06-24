import { motion } from 'framer-motion';
import { SiGoogleanalytics, SiGoogle, SiPython, SiWordpress } from 'react-icons/si';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { FaChartLine } from 'react-icons/fa6';

const skillsData = [
  {
    category: 'Marketing & Growth',
    level: 'Advanced',
    skills: [
      'SEO Strategy & Technical SEO',
      'Keyword Research & Competitive Analysis',
      'Content Gap Analysis & Editorial Planning',
      'Performance Marketing & CRO',
      'Funnel Analysis & Attribution Modeling'
    ],
  },
  {
    category: 'Data & Analytics',
    level: 'Advanced',
    skills: [
      'Google Analytics 4 (Advanced Segments)',
      'Cohort & Retention Analysis',
      'CTR Optimization & SERP Analysis',
      'Data Visualization & Dashboards',
      'A/B Testing & Statistical Significance'
    ],
  },
  {
    category: 'Technical & Automation',
    level: 'Intermediate',
    skills: [
      'Python (Pandas, BeautifulSoup, Selenium)',
      'API Automation (GSC, GA4, Sheets)',
      'WordPress (Custom Plugins & Themes)',
      'Zapier Workflows & CRM Syncing',
      'Automated Reporting Pipelines'
    ],
  },
  {
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    skills: [
      'LLMs & Prompt Engineering (Claude, GPT)',
      'AI Content Generation & Humanization',
      'NLP: Sentiment Analysis & Classification',
      'Transformer Models (BERT, XLM-R)',
      'Exploratory Data Analysis (scikit-learn)'
    ],
  }
];

const toolsData = [
  { name: 'Python', icon: <SiPython size={36} />, color: '#3776AB' },
  { name: 'Google Analytics', icon: <SiGoogleanalytics size={36} />, color: '#E37400' },
  { name: 'Search Console', icon: <SiGoogle size={36} />, color: '#4285F4' },
  { name: 'WordPress', icon: <SiWordpress size={36} />, color: '#21759B' },
  { name: 'Ahrefs / SEO', icon: <FaChartLine size={36} />, color: '#FF6900' },
  { name: 'Data Studio', icon: <TbBrandGoogleAnalytics size={36} />, color: '#4285F4' },
];

const learningItems = [
  'Multi-touch attribution modeling for complex B2B funnels',
  'Statistical rigor in A/B testing (power analysis, Bayesian methods)',
  'Advanced SEO: E-E-A-T signals, topical authority, semantic SEO',
  'AI prompt engineering & fine-tuning for content generation',
  'Growth engineering fundamentals & experimentation frameworks'
];

const Skills = () => {
  return (
    <section className="section" id="skills">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'left', marginBottom: '40px' }}
      >
        <span className="section-label">04</span>
        <h2 className="accent-text" style={{ fontSize: '3rem' }}>Skills & Stack</h2>
      </motion.div>

      {/* Core Competencies — by proficiency */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '24px', fontWeight: 600, textTransform: 'none', letterSpacing: 'normal' }}>Core Competencies</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {skillsData.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="glass-card skill-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-color)', textTransform: 'none', letterSpacing: 'normal', fontWeight: 600 }}>{group.category}</h4>
                <span className="skill-level-badge">{group.level}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {group.skills.map((skill, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--accent-color)', fontSize: '0.55rem' }}>●</span> {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tools & Platforms */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '24px', fontWeight: 600, textTransform: 'none', letterSpacing: 'normal' }}>Tools & Platforms</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '20px' }}>
          {toolsData.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08, y: -5 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card tool-card"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '24px 16px', cursor: 'default' }}
            >
              <div style={{ color: tool.color, transition: 'color 0.3s ease' }}>{tool.icon}</div>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Currently Learning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '24px', fontWeight: 600, textTransform: 'none', letterSpacing: 'normal' }}>
          Currently Exploring <span style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 400, marginLeft: '8px' }}>🔍</span>
        </h3>
        <div className="glass-card" style={{ borderLeft: '3px solid var(--accent-color)' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {learningItems.map((item, i) => (
              <li key={i} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                <span style={{ color: 'var(--accent-secondary)', marginTop: '2px', flexShrink: 0 }}>→</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginTop: '60px', textAlign: 'center', padding: '40px', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}
      >
        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '16px' }}>Let's discuss how I can help your team grow.</h3>
        <a href="#contact" className="glow-button" style={{ textDecoration: 'none', display: 'inline-block' }}>Schedule a chat →</a>
      </motion.div>
    </section>
  );
};

export default Skills;
