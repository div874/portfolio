import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import TechMarquee from '../components/TechMarquee';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ExternalLink, TrendingUp, Bot, Zap, BarChart3 } from 'lucide-react';

interface HomeProps {
  onConnectClick: () => void;
  isLoading?: boolean;
}

const expertiseData = [
  {
    icon: <TrendingUp size={32} style={{ color: 'var(--accent-secondary)' }} />,
    title: 'Data-Driven SEO Strategy',
    description: 'Validating high-intent search keywords, auditing content structures, and executing scalable organic growth frameworks.',
    tags: ['Keyword Research', 'Content Strategy', 'Competitor Teardowns']
  },
  {
    icon: <Bot size={32} style={{ color: 'var(--accent-secondary)' }} />,
    title: 'AI Content & Automation',
    description: 'Building LLM content generation pipelines with customized humanization rulesets and Python automated reporting scripts.',
    tags: ['Claude & OpenAI API', 'Python Automation', 'Humanization Pipelines']
  },
  {
    icon: <Zap size={32} style={{ color: 'var(--accent-secondary)' }} />,
    title: 'Technical SEO & Speed',
    description: 'Auditing site crawlability, schema markup, indexation health, and optimizing Core Web Vitals for maximum rankings.',
    tags: ['Core Web Vitals', 'Schema Markup', 'Site Audit']
  },
  {
    icon: <BarChart3 size={32} style={{ color: 'var(--accent-secondary)' }} />,
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

interface ClientCaseStudy {
  websiteUrl: string;
  role: string;
  summary: string;
  contributions: string[];
  results: string[];
  embeddable?: boolean;
}

const defaultDetails: ClientCaseStudy = {
  websiteUrl: '#',
  role: 'Growth Support & Marketing Optimization',
  summary: 'Delivered data-driven optimizations and performance marketing solutions.',
  contributions: [
    'Managed search engine optimization (SEO) audits and landing page modifications.',
    'Integrated analytical tools (GA4, Google Search Console) to track campaign metrics.',
    'Executed keyword research and competitive positioning teardowns.'
  ],
  results: [
    'Measurable increase in organic search visibility and click-through rates.',
    'Optimized campaign costs and conversion workflows.',
    'Improved page layout structure for better search crawling.'
  ],
  embeddable: false
};

const clientDetailsMap: Record<string, ClientCaseStudy> = {
  '1page.info': {
    websiteUrl: 'https://www.1page.info/',
    role: 'SEO & Content Automation',
    summary: 'Scaled organic search visibility and built high-performance content pipelines.',
    contributions: [
      'Created 25+ SEO-optimized articles targeting healthcare and agriculture verticals.',
      'Integrated Claude API for content generation with a custom 19-point humanization ruleset.',
      'Designed technical internal linking registry to boost indexing and keyword authority.'
    ],
    results: [
      '+35% average organic traffic lift within 8 weeks.',
      'Sub-20% AI detection scores across all bulk-generated pages.',
      'Reduced crawl errors and improved indexing rate by 15%.'
    ],
    embeddable: false
  },
  'brandloom': {
    websiteUrl: 'https://www.brandloom.com',
    role: 'WordPress & AI Integration',
    summary: 'Optimized speed performance and technical SEO setups for multiple client brands.',
    contributions: [
      'Developed and speed-optimized 8 WordPress brand websites.',
      'Implemented Yoast SEO and RankMath schemas, setting up custom JSON-LD schemas.',
      'Optimized page assets, images, and scripting, improving load speed by 22%.'
    ],
    results: [
      'Successfully pushed 5 sites to Page 1 Google rankings for primary keywords.',
      'Maintained 4.8/5 client satisfaction score across completed projects.',
      '22% reduction in initial page load speed.'
    ],
    embeddable: false
  },
  'soulcare': {
    websiteUrl: 'https://www.soulcare.in',
    role: 'Technical SEO & Website Optimization',
    summary: 'Enhanced page load performance and local SEO discovery for a lifestyle brand.',
    contributions: [
      'Audited site pages for Core Web Vitals, fixing cumulative layout shifts (CLS) and image sizes.',
      'Implemented structured data schema for articles and local services.',
      'Re-engineered navigation menu hierarchy to improve crawl depth.'
    ],
    results: [
      'Increased mobile page speed score from 65 to 88.',
      '30% increase in weekly organic search queries.',
      '12% bounce rate reduction.'
    ],
    embeddable: false
  },
  'siddhgiri': {
    websiteUrl: 'https://siddhgiri.com',
    role: 'SEO Campaign & Content Strategy',
    summary: 'Led B2B keyword acquisition and competitor intelligence research.',
    contributions: [
      'Identhed 200+ high-value target keywords through search-volume gap analysis.',
      'Wrote content briefs and optimized landing pages for core B2B products.',
      'Conducted competitor backlink audits to uncover target outreach list.'
    ],
    results: [
      'Ranked top 10 for 12 competitive B2B search terms.',
      '18% increase in organic leads generated via product pages.',
      '25% growth in high-domain backlink profile.'
    ],
    embeddable: false
  },
  'mtp': {
    websiteUrl: '#',
    role: 'Lead Generation & Optimization',
    summary: 'Engineered lead capture forms and conversion rate optimizations.',
    contributions: [
      'Built custom Python scripts to scrape and monitor competitor price listings.',
      'Optimized landing page conversion funnels by redesigning call-to-action sections.',
      'Implemented Google Tag Manager (GTM) event tracking for contact forms.'
    ],
    results: [
      '15% conversion rate improvement on contact forms.',
      'Reduced cost-per-lead by 8% in Google Ads campaigns.',
      'Automated reporting pipeline saving 4 hours of manual labor per week.'
    ]
  },
  'skillssoft': {
    websiteUrl: 'https://skillsoftoverseas.com',
    role: 'Local SEO & Content Strategy',
    summary: 'Improved online discovery for regional educational consulting services.',
    contributions: [
      'Optimized Google Business Profile listings, increasing local visibility.',
      'Wrote highly relevant blogs targeting overseas student visa inquiries.',
      'Structured on-page content with structured FAQ schemas.'
    ],
    results: [
      '45% growth in map pack listing impressions.',
      '20% increase in organic consultation bookings.',
      '10+ primary keywords ranking in top 5 locally.'
    ]
  },
  'vhseng': {
    websiteUrl: '#',
    role: 'Performance Marketing & SEO',
    summary: 'Managed Google Search campaigns and organic keywords ranking strategy.',
    contributions: [
      'Managed Google Ads campaigns with optimized negative keyword lists.',
      'Wrote optimized meta descriptions and titles across 40+ engineering service pages.',
      'Created custom dashboards for monthly search visibility and click-through analysis.'
    ],
    results: [
      '5% reduction in overall cost-per-click (CPC).',
      '15% increase in total ad click-through rate (CTR).',
      'Doubled organic traffic to key engineering catalog pages.'
    ]
  },
  'eliteorganic': {
    websiteUrl: '#',
    role: 'E-commerce SEO & Copywriting',
    summary: 'Optimized product descriptions and category page discovery for organic health products.',
    contributions: [
      'Optimized product images, alt-texts, and meta tags for e-commerce category pages.',
      'Conducted keyword audits for organic food terms, shifting copy to high-intent terms.',
      'Set up Product schema markup to show star ratings and prices in Google search results.'
    ],
    results: [
      '30% organic click growth on category listings.',
      '14% increase in e-commerce conversion rate.',
      'Rich snippet rankings (stars/pricing) showing on active search results.'
    ]
  },
  'virtualsystems': {
    websiteUrl: '#',
    role: 'Web Development & Growth Support',
    summary: 'Built conversion landing pages and integrated analytics pipelines.',
    contributions: [
      'Coded responsive web pages optimized for quick page speed scores.',
      'Integrated GA4, Facebook Pixel, and Hotjar heatmaps for user behavior tracking.',
      'Set up automation flows syncing web leads to CRM platforms.'
    ],
    results: [
      '100% automated lead syncing, eliminating manual entries.',
      'Improved mobile loading speed score to 90+.',
      '22% increase in user session durations.'
    ]
  }
};

const getClientDetails = (name: string) => {
  const normKey = name.toLowerCase().trim().replace(/\s+/g, '');
  return clientDetailsMap[normKey] || defaultDetails;
};

const Home = ({ onConnectClick, isLoading = false }: HomeProps) => {
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const closeModal = () => setSelectedClient(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedClient) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedClient]);



  return (
    <div className="page-home">
      {/* Hero Header */}
      <Hero onConnectClick={onConnectClick} isLoading={isLoading} />

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
              <div style={{ display: 'flex', alignItems: 'center', height: '36px', marginBottom: '16px' }}>{item.icon}</div>
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

      {/* Tech Stack Sliding Icons Marquee */}
      <TechMarquee />

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

        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap' }}>
          {/* Left side: Grey container for logos */}
          <div style={{
            flex: 1,
            minWidth: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            background: 'var(--border-hover)',
            border: '1px solid var(--glass-border)',
            borderRadius: '20px',
            padding: '30px 20px'
          }}>
          {clientLogos.map((client, idx) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              onClick={() => setSelectedClient(client)}
              whileHover={{ scale: 1.02, borderColor: 'var(--border-hover)' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '200px',
                height: '80px',
                padding: '12px',
                borderRadius: '12px',
                background: 'var(--border-hover)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 8px 24px var(--border-hover)',
                cursor: 'pointer'
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

          {/* Right side: Mascot Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ width: '350px', flexShrink: 0, margin: '0 auto' }}
          >
            <img 
              src="/clients_mascot.png" 
              alt="Mascot Handshake" 
              style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.1))' }} 
            />
          </motion.div>
        </div>

        <div style={{ 
          marginTop: '20px', 
          textAlign: 'center'
        }}>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.85rem', 
            fontStyle: 'italic', 
            margin: '0 auto',
            maxWidth: '600px',
            lineHeight: '1.4'
          }}>
            * Note: Some of these clients were collaborated with during internship/agency roles, not as direct private personal clients.
          </p>
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
            background: 'var(--card-bg) 0%, var(--border-hover) 100%)',
            border: '1px solid var(--border-hover)',
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

      {/* Case Study Modal Popup Overlay */}
      <AnimatePresence>
        {selectedClient && (() => {
          const details = getClientDetails(selectedClient.name);
          const hasUrl = details.websiteUrl && details.websiteUrl !== '#';

          return (
            <motion.div 
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div 
                className="modal-card"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button className="modal-close" onClick={closeModal} aria-label="Close modal">
                  <X size={18} />
                </button>

                {/* Details & Impact Case Study */}
                <div className="modal-details-half">
                  <div>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-color)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      display: 'block',
                      marginBottom: '6px'
                    }}>
                      {details.role}
                    </span>
                    <h3 style={{
                      fontSize: '1.8rem',
                      color: 'var(--text-primary)',
                      fontFamily: '"Outfit", sans-serif',
                      fontWeight: 800,
                      textTransform: 'none',
                      lineHeight: 1.1,
                      marginBottom: '12px'
                    }}>
                      {selectedClient.name}
                    </h3>
                    <p style={{
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6
                    }}>
                      {details.summary}
                    </p>
                  </div>

                  <div>
                    <h4 style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                      borderLeft: '3px solid var(--accent-color)',
                      paddingLeft: '10px'
                    }}>
                      What I Did
                    </h4>
                    <ul style={{
                      paddingLeft: '18px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      {details.contributions.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                      borderLeft: '3px solid var(--accent-secondary)',
                      paddingLeft: '10px'
                    }}>
                      Impact & Results
                    </h4>
                    <ul style={{
                      paddingLeft: '18px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      {details.results.map((r, i) => (
                        <li key={i}>
                          <strong style={{ color: 'var(--text-primary)' }}>{r.split(':')[0]}</strong>
                          {r.split(':')[1] ? `:${r.split(':')[1]}` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {hasUrl && (
                    <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                      <a 
                        href={details.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="glow-button"
                        style={{
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          width: '100%',
                          justifyContent: 'center',
                          padding: '12px 24px'
                        }}
                      >
                        <span>Visit Website</span>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};

export default Home;
