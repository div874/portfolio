'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  SiPython, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiFastapi, 
  SiPostgresql, 
  SiGoogleanalytics, 
  SiGoogle, 
  SiDocker, 
  SiGit, 
  SiVercel, 
  SiTailwindcss,
  SiOpenai,
  SiPandas
} from 'react-icons/si';
import { TbBrandGoogleAnalytics, TbShieldCheck, TbCode, TbCpu, TbDatabase, TbArrowRight } from 'react-icons/tb';
import { FaChartLine } from 'react-icons/fa6';

// Primary Stack: Technologies used independently in production to architect and deploy systems
const independentProductionStack = [
  {
    category: 'AI & Machine Learning Systems',
    icon: <TbCpu size={24} style={{ color: '#a855f7' }} />,
    tagline: 'Architected & deployed independently',
    technologies: ['Python', 'LangChain', 'OpenAI & Claude APIs', 'FAISS Vector Search', 'Hugging Face Transformers'],
    capabilities: [
      'Retrieval-Augmented Generation (RAG) with custom vector embedding retrieval',
      'Multi-step autonomous agent workflows & prompt engineering pipelines',
      'NLP complaint categorization & transformer-based text analysis (BERT / XLM-R)',
      'Automated LLM content evaluation, guardrails & humanization'
    ],
    proofOfWork: [
      { label: 'Wallcurry AI Recommender (88% Precision)', link: '/projects/wallcurry-ai-recommendation' },
      { label: 'Brand Sutra AI Governance Platform', link: '/projects/brand-sutra' },
      { label: 'IEEE Published Research Paper (CONIT 2026)', link: 'https://ieeexplore.ieee.org/abstract/document/11621397', external: true }
    ]
  },
  {
    category: 'Full-Stack Web Engineering',
    icon: <TbCode size={24} style={{ color: '#3b82f6' }} />,
    tagline: 'End-to-end production development',
    technologies: ['Next.js (App Router)', 'React 19', 'TypeScript', 'FastAPI', 'Tailwind CSS', 'Supabase (PostgreSQL)'],
    capabilities: [
      'Production SSR, SSG, dynamic server rendering & Next.js Turbopack architectures',
      'Secure server actions, REST API design & cloud database integrations',
      'Role-based access control, file storage pipelines & administrative dashboards',
      'Responsive, accessible UI with smooth micro-interactions & zero layout shift'
    ],
    proofOfWork: [
      { label: 'Brand Sutra Full-Stack App', link: '/projects/brand-sutra' },
      { label: 'Next.js Production Engine & Headless CMS', link: '/projects/nextjs-portfolio-engine' }
    ]
  },
  {
    category: 'Automated Data Pipelines & APIs',
    icon: <TbDatabase size={24} style={{ color: '#10b981' }} />,
    tagline: 'Eliminating manual data bottlenecks',
    technologies: ['Python (Pandas, Requests, BeautifulSoup)', 'Google Search Console API', 'GA4 Data API', 'Selenium', 'CRON Automation'],
    capabilities: [
      'Automated ETL workflows extracting live search and traffic analytics via REST APIs',
      'Automated client reporting pipelines generating PDF dashboards without manual input',
      'SERP scraping and rank monitoring tools for multi-client accounts',
      'Webhook synchronization connecting analytical databases to production interfaces'
    ],
    proofOfWork: [
      { label: 'Automated SEO Reporting Dashboard (Saved 6 hrs/wk)', link: '/projects/seo-reporting-automation' },
      { label: 'Attribution Marketing Analytics System', link: '/projects/attribution-marketing-analytics' }
    ]
  },
  {
    category: 'Technical Growth & Search Architecture',
    icon: <FaChartLine size={20} style={{ color: '#f59e0b' }} />,
    tagline: 'Proven measurable business outcomes',
    technologies: ['Technical SEO Auditing', 'JSON-LD Schema Engineering', 'Core Web Vitals Optimization', 'Topical Authority Clustering'],
    capabilities: [
      'Programmatic keyword strategy and internal linking crawl trees for large-scale sites',
      'Search crawler log diagnosis, sitemap structuring, and crawl budget optimization',
      'Conversion rate optimization (CRO) & funnel analysis across landing pages',
      'Multi-vertical organic search acquisition pipelines'
    ],
    proofOfWork: [
      { label: 'B2B SEO & AI Automation Case Study (+240% Traffic)', link: '/case-studies/b2b-seo-ai-traffic-growth' },
      { label: '1page.info Content & SEO Systems (12+ Verticals)', link: '/experience' }
    ]
  }
];

// Supporting Tools: Integrated into workflow for containerization, hosting & team shipping
const supportingTools = [
  { name: 'Git & GitHub', role: 'Version control & CI/CD', icon: <SiGit size={26} />, color: '#F05032' },
  { name: 'Docker', role: 'Local containerization', icon: <SiDocker size={26} />, color: '#2496ED' },
  { name: 'Vercel', role: 'Edge deployment & analytics', icon: <SiVercel size={26} />, color: '#171717' },
  { name: 'Supabase', role: 'PostgreSQL, Auth & Storage', icon: <SiPostgresql size={26} />, color: '#4169E1' },
  { name: 'Google Analytics 4', role: 'Event tracking & retention', icon: <SiGoogleanalytics size={26} />, color: '#E37400' },
  { name: 'Search Console', role: 'Indexation & SERP metrics', icon: <SiGoogle size={26} />, color: '#4285F4' },
  { name: 'Looker Studio', role: 'BI & performance reports', icon: <TbBrandGoogleAnalytics size={26} />, color: '#4285F4' },
  { name: 'Tailwind CSS', role: 'Design system & styling', icon: <SiTailwindcss size={26} />, color: '#06B6D4' }
];

const Skills = () => {
  return (
    <section className="section" id="skills" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
      
      {/* Header with Recruiter Assurance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'left', marginBottom: '32px' }}
      >
        <span className="section-label">TECHNICAL COMPETENCE</span>
        <h1 className="accent-text" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', marginBottom: '16px' }}>
          Skills & Production Stack
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.6 }}>
          Rather than an unverified laundry list of 30 buzzwords, here is an honest breakdown of <strong>what I build independently in production</strong>, paired with concrete proof of work.
        </p>
      </motion.div>

      {/* Recruiter Guarantee Banner */}
      <div style={{
        background: 'rgba(168, 85, 247, 0.05)',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        borderRadius: '12px',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '48px',
        flexWrap: 'wrap'
      }}>
        <TbShieldCheck size={28} style={{ color: '#a855f7', flexShrink: 0 }} />
        <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Recruiter Note:</strong> Every technology listed under the <em>Independent Production Stack</em> has been used to build and deploy live, functional software or client outcomes without hand-holding.
        </div>
      </div>

      {/* TIER 1: Independent Production Stack */}
      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>
            Core Independent Stack
          </h2>
          <span style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 600 }}>
            • Architected & Coded From Scratch
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {independentProductionStack.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '28px',
                borderRadius: '18px',
                border: '1px solid var(--border-color)'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{
                    padding: '10px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {group.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>
                      {group.category}
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {group.tagline}
                    </span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {group.technologies.map(tech => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(168, 85, 247, 0.1)',
                        color: 'var(--accent-color, #a855f7)',
                        border: '1px solid rgba(168, 85, 247, 0.2)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* What I Build Independently */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    What I Build Independently:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {group.capabilities.map((cap, i) => (
                      <li key={i} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--accent-color)', marginTop: '4px', fontSize: '0.6rem' }}>●</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Proof of Work */}
              <div style={{
                marginTop: 'auto',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-secondary, #3b82f6)', marginBottom: '8px' }}>
                  Verified Proof of Work:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {group.proofOfWork.map((pow, i) => (
                    'external' in pow && pow.external ? (
                      <a
                        key={i}
                        href={pow.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontWeight: 500,
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#a855f7')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                      >
                        <TbArrowRight size={14} style={{ color: 'var(--accent-color)' }} />
                        <span>{pow.label} ↗</span>
                      </a>
                    ) : (
                      <Link
                        key={i}
                        href={pow.link}
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontWeight: 500,
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#a855f7')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                      >
                        <TbArrowRight size={14} style={{ color: 'var(--accent-color)' }} />
                        <span>{pow.label} →</span>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TIER 2: Supporting Tooling & Infrastructure */}
      <div style={{ marginBottom: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>
            Supporting Tools & Infrastructure
          </h2>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            • Workflow integration, hosting & containerization
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {supportingTools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 20px',
                borderRadius: '12px'
              }}
            >
              <div style={{ color: tool.color, flexShrink: 0 }}>{tool.icon}</div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>{tool.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{tool.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          marginTop: '60px',
          textAlign: 'center',
          padding: '40px 30px',
          background: 'var(--glass-bg)',
          borderRadius: '16px',
          border: '1px solid var(--glass-border)'
        }}
      >
        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '12px' }}>
          Need these capabilities on your engineering or growth team?
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 24px' }}>
          I am available for AI engineer, full-stack, and growth automation opportunities.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/projects" className="glow-button" style={{ textDecoration: 'none', padding: '12px 24px' }}>
            Explore Shipped Projects →
          </Link>
          <a href="/Divyansh_Chandra_Resume.pdf" download="Divyansh_Chandra_Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600, padding: '12px 20px' }}>
            Download Resume 📄
          </a>
        </div>
      </motion.div>

    </section>
  );
};

export default Skills;
