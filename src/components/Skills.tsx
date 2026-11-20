'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  SiPython, 
  SiJavascript,
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiPostgresql, 
  SiGoogleanalytics, 
  SiGoogle, 
  SiGit, 
  SiGithub,
  SiTailwindcss,
  SiOpenai,
  SiPandas
} from 'react-icons/si';
import { 
  TbBrandGoogleAnalytics, 
  TbShieldCheck, 
  TbCode, 
  TbCpu, 
  TbDatabase, 
  TbArrowRight,
  TbBulb,
  TbChartDots
} from 'react-icons/tb';
import { FaChartLine } from 'react-icons/fa6';

// 4 Core Competency Categories directly aligned with technical background & resume
const coreCompetencyStack = [
  {
    category: 'Product Management & Strategy',
    icon: <TbBulb size={24} style={{ color: '#f59e0b' }} />,
    tagline: 'Translating user problems into data-driven digital solutions',
    skillsList: [
      'Problem Framing',
      'Feature Prioritization',
      'Product Analytics',
      'KPI Trees',
      'Experimentation & A/B Testing',
      'User Journey & Funnel Design'
    ],
    capabilities: [
      'Framing user pain points into structured PRDs, roadmaps, and measurable metrics',
      'Prioritizing features across early-stage discovery and AI product workflows',
      'Designing event taxonomy, conversion funnels, and retention KPI trees',
      'Formulating AI product governance frameworks and compliance rubrics'
    ],
    proofOfWork: [
      { label: 'Humara Sheher – City Discovery Platform', link: '/projects/humara-sheher' },
      { label: 'Brand Sutra – AI Brand Governance Platform', link: '/projects/brand-sutra' },
      { label: 'Zepto vs Zomato: Loyalty & Retention Teardown', link: '/journey/zepto-zomato-customer-loyalty-marketing-growth' }
    ]
  },
  {
    category: 'AI & Machine Learning (AI & ML)',
    icon: <TbCpu size={24} style={{ color: '#a855f7' }} />,
    tagline: 'Deep learning, transformers, and production LLM workflows',
    skillsList: [
      'NLP (Natural Language Processing)',
      'Deep Learning',
      'Transformers (XLM-RoBERTa, BERT)',
      'LLM APIs & Prompt Engineering',
      'RAG (Retrieval-Augmented Generation)',
      'LangChain',
      'NER & Sentiment Analysis'
    ],
    capabilities: [
      'Multilingual customer complaint triage with XLM-RoBERTa, BERT, and NER',
      'Retrieval-Augmented Generation (RAG) with vector search and document grounding',
      'Prompt chaining, automated guardrails, and context-aware resolution drafting',
      'Computer vision for room detection, lighting analysis, and visual recommendations'
    ],
    proofOfWork: [
      { label: 'Customer Complaint Auto Resolver (IEEE CONIT 2026)', link: '/projects/customer-complaint-auto-resolver' },
      { label: 'Wallcurry AI Recommendation Model (88% Accuracy)', link: '/projects/wallcurry-ai-recommendation' },
      { label: 'Published IEEE Research Paper [DOI: 11621397]', link: 'https://ieeexplore.ieee.org/abstract/document/11621397', external: true }
    ]
  },
  {
    category: 'Programming & Development',
    icon: <TbCode size={24} style={{ color: '#3b82f6' }} />,
    tagline: 'Engineering full-stack web platforms and backend automation',
    skillsList: [
      'Python',
      'SQL',
      'JavaScript & TypeScript',
      'C++',
      'HTML/CSS',
      'REST APIs',
      'Git / GitHub',
      'Next.js & React (VS Code)'
    ],
    capabilities: [
      'Building performant, responsive web apps using Next.js App Router and React',
      'Automated data collection, cleaning, and deduplication pipelines in Python',
      'Designing RESTful API endpoints, server actions, and relational SQL queries',
      'Version-controlled collaborative development with Git and GitHub CI/CD workflows'
    ],
    proofOfWork: [
      { label: 'Humara Sheher Discovery Engine', link: '/projects/humara-sheher' },
      { label: 'High-Performance Web Portfolio Engine', link: '/projects/nextjs-portfolio-engine' },
      { label: 'Brand Sutra Codebase on GitHub', link: 'https://github.com/div874/Brand-Sutra', external: true }
    ]
  },
  {
    category: 'Analytics & MarTech',
    icon: <TbChartDots size={24} style={{ color: '#10b981' }} />,
    tagline: 'Search performance, data reporting, and organic growth systems',
    skillsList: [
      'Google Analytics 4 (GA4)',
      'Google Search Console (GSC)',
      'Power BI',
      'Tableau',
      'Technical SEO & Audits',
      'Keyword Research & Strategy'
    ],
    capabilities: [
      'Managing SEO & keyword strategies across 30+ client websites with 9.3+ SEO scores',
      'Building automated data extraction pipelines interfacing with GSC API and GA4 API',
      'Topical authority clustering, crawl budget optimization, and JSON-LD schemas',
      'Designing interactive executive dashboards in Power BI, Tableau, and Looker Studio'
    ],
    proofOfWork: [
      { label: '1page.info Growth Systems (30+ Clients, 9.3+ Scores)', link: '/experience' },
      { label: 'B2B SEO & AI Automation Case Study (+240% Traffic)', link: '/case-studies/b2b-seo-ai-traffic-growth' },
      { label: 'SEO Reporting Automation Dashboard (Saved 6 hrs/wk)', link: '/projects/seo-reporting-automation' }
    ]
  }
];

// Tools & Platforms Verified in Active Development
const toolsList = [
  { name: 'Python', role: 'Data, AI & Automation', icon: <SiPython size={26} />, color: '#3776AB' },
  { name: 'Next.js & React', role: 'Full-stack frontend', icon: <SiNextdotjs size={26} />, color: '#171717' },
  { name: 'TypeScript', role: 'Type-safe applications', icon: <SiTypescript size={26} />, color: '#3178C6' },
  { name: 'OpenAI / Claude', role: 'LLM APIs & Prompting', icon: <SiOpenai size={26} />, color: '#10A37F' },
  { name: 'Pandas & SQL', role: 'Data transformations', icon: <SiPandas size={26} />, color: '#150458' },
  { name: 'GA4 & GSC', role: 'Search & web analytics', icon: <SiGoogleanalytics size={26} />, color: '#E37400' },
  { name: 'Git & GitHub', role: 'Version control', icon: <SiGit size={26} />, color: '#F05032' },
  { name: 'Tailwind CSS', role: 'Design systems & UI', icon: <SiTailwindcss size={26} />, color: '#06B6D4' }
];

const Skills = () => {
  return (
    <section className="section" id="skills" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'left', marginBottom: '32px' }}
      >
        <span className="section-label">TECHNICAL COMPETENCE</span>
        <h1 className="accent-text" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', marginBottom: '16px' }}>
          Technical Skills & Capabilities
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.6 }}>
          A clear breakdown of my competencies across <strong>Product Management, AI & Machine Learning, Software Development, and Growth Analytics</strong>, supported by concrete proof of work.
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
          <strong style={{ color: 'var(--text-primary)' }}>Recruiter Verification:</strong> Every skill listed here represents hands-on, independent implementation applied across published academic research, live client campaigns, or shipped platforms.
        </div>
      </div>

      {/* 4 Core Competency Cards */}
      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {coreCompetencyStack.map((group, index) => (
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
                    <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>
                      {group.category}
                    </h2>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {group.tagline}
                    </span>
                  </div>
                </div>

                {/* Skills Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {group.skillsList.map(skill => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(168, 85, 247, 0.08)',
                        color: 'var(--accent-color, #a855f7)',
                        border: '1px solid rgba(168, 85, 247, 0.2)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Key Capabilities */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    Core Implementation Capabilities:
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

      {/* Primary Toolset Grid */}
      <div style={{ marginBottom: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 700, margin: 0 }}>
            Applied Development Tools & Platforms
          </h2>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            • Daily development environment & tools
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {toolsList.map((tool, index) => (
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
          Need these skills on your product or engineering team?
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 24px' }}>
          I am actively exploring roles in AI Product Management, MarTech & Analytics, and AI Solutions Engineering.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/projects" className="glow-button" style={{ textDecoration: 'none', padding: '12px 24px' }}>
            Explore All Projects →
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
