import { motion } from 'framer-motion';

const experiences = [
  {
    company: '1pageinfo, Virtual',
    role: 'Digital Marketing Intern',
    period: 'Apr 2026 - Present',
    points: [
      { bold: 'Content Optimization:', text: 'Created 25+ SEO-optimized blog posts across Healthcare & Food & Agriculture verticals; achieved 35% average organic traffic increase within 8 weeks' },
      { bold: 'Keyword Research:', text: 'Researched and validated 200+ target keywords; identified 15 high-intent, low-competition opportunities using competitive analysis frameworks' },
      { bold: 'Technical SEO:', text: 'Audited 50+ website pages for Core Web Vitals, meta optimization, schema markup, and crawlability; fixed critical issues improving indexability' },
      { bold: 'AI Content Pipeline:', text: 'Integrated Claude API for bulk content generation; developed 19-point humanization ruleset achieving sub-20% AI detection scores across 100+ pages' },
      { bold: 'Automation:', text: 'Built Python scripts automating competitor analysis and monthly SEO reporting, saving 8+ hours of manual work per month' },
      { bold: 'Data Analysis:', text: 'Used GA4 advanced segments to identify top-performing content, traffic sources, and drop-off patterns; recommended optimizations reducing bounce rate by 12%' }
    ]
  },
  {
    company: 'Unknown Discounts, Virtual',
    role: 'Digital Marketing Intern',
    period: 'Mar 2026 - Present',
    points: [
      { bold: 'Campaign Execution:', text: 'Managed social media calendar for 3 brands; published 40+ posts achieving 12% average engagement rate (Instagram), 8% CTR (Facebook)' },
      { bold: 'SEO Support:', text: 'Optimized 15+ landing pages using keyword-driven copywriting and on-page best practices; contributed to 18% organic traffic increase' },
      { bold: 'Content Strategy:', text: 'Assisted in competitive content analysis for 5 e-commerce brands; identified 10 high-ROI content gaps' },
      { bold: 'Ads Management:', text: 'Managed Google Ads accounts (~$2K/month budget), optimized ad copy and targeting for 5% cost-per-click reduction' }
    ]
  },
  {
    company: 'Brandloom, Mumbai',
    role: 'AI & Marketing Intern',
    period: 'May 2025 - Sep 2025',
    points: [
      { bold: 'WordPress Development:', text: 'Built and optimized 8 WordPress websites; integrated 15+ AI-powered plugins (Yoast SEO, RankMath, AI Content Generator) improving page load speed by 22%' },
      { bold: 'On-Page SEO:', text: 'Implemented keyword-optimized meta tags, internal linking structures, and content formatting; improved average page rankings from position 15 → 6 within 2 months' },
      { bold: 'Performance:', text: 'Achieved 5 websites to Page 1 Google rankings for primary keywords; tracked results via GSC and GA4' },
      { bold: 'Client Results:', text: 'Delivered projects for 3 clients; average client satisfaction 4.8/5; repeat business from 2 clients' }
    ]
  }
];

const Experience = () => {
  return (
    <section className="section" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'left', marginBottom: '60px' }}
      >
        <span className="section-label">02</span>
        <h2 className="accent-text" style={{ fontSize: '3rem' }}>Experience</h2>
      </motion.div>
      
      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="timeline__item"
          >
            <div className="timeline__dot" />
            <div className="timeline__card glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', textTransform: 'none', letterSpacing: 'normal', fontWeight: 700 }}>{exp.role}</h3>
                <span className="timeline__badge">{exp.period}</span>
              </div>
              <h4 style={{ color: 'var(--accent-secondary)', marginBottom: '18px', fontSize: '1rem', textTransform: 'none', letterSpacing: 'normal', fontWeight: 500 }}>{exp.company}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {exp.points.map((point, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.65, fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--accent-color)', marginTop: '2px', flexShrink: 0 }}>▹</span>
                    <span><strong style={{ color: 'var(--text-primary)' }}>{point.bold}</strong> {point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginTop: '60px', textAlign: 'center' }}
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1.05rem' }}>Want to see the actual results from these projects?</p>
        <a href="#projects" className="glow-button" style={{ textDecoration: 'none', display: 'inline-block' }}>View Case Studies →</a>
      </motion.div>
    </section>
  );
};

export default Experience;
