'use client';

import Link from 'next/link';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa6';
import { Mail, ArrowUpRight } from 'lucide-react';

const mainNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Selected Projects', href: '/projects' },
  { label: 'Journal & Insights', href: '/journey' },
  { label: 'Work Experience', href: '/experience' },
  { label: 'Technical Skills', href: '/skills' },
  { label: 'Curriculum Vitae', href: '/cv' },
];

const featuredArticles = [
  { 
    label: 'What is RAG in AI? Retrieval-Augmented Generation', 
    href: '/journey/what-is-rag-in-ai',
    tag: 'AI & Engineering'
  },
  { 
    label: 'Starting My AI Journey: LLMs, RAG & AI Agents', 
    href: '/journey/starting-my-ai-journey-what-i-learned-about-llms-rag-and-ai-agents',
    tag: 'LLMs & Agents'
  },
  { 
    label: 'Marketing Concepts from HUL: FMCG Competitive Dynamics', 
    href: '/journey/marketing-concepts-hul-fmcg',
    tag: 'Marketing Strategy'
  },
  { 
    label: 'Zepto vs Zomato: Customer Loyalty & Retention', 
    href: '/journey/zepto-zomato-customer-loyalty-marketing-growth',
    tag: 'Growth Engineering'
  },
  { 
    label: 'Building Hamara Sheher: Local Community Platform', 
    href: '/journey/building-hamara-sheher',
    tag: 'Product Design'
  },
];

const featuredWork = [
  {
    label: 'Customer Complaint Auto Resolver (IEEE CONIT 2026)',
    href: '/projects/customer-complaint-auto-resolver',
    tag: 'DL & NLP'
  },
  {
    label: 'Humara Sheher – City Discovery Platform',
    href: '/projects/humara-sheher',
    tag: 'Product'
  },
  {
    label: 'Brand Sutra: AI Brand Governance Platform',
    href: '/projects/brand-sutra',
    tag: 'AI Strategy'
  },
  {
    label: 'Wallcurry Model: AI Mural Recommendation',
    href: '/projects/wallcurry-ai-recommendation',
    tag: 'Python & CV'
  },
];

const Footer = () => {
  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--glass-border)', padding: '60px 8% 30px', position: 'relative', zIndex: 10 }}>
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}
      >
        {/* Brand Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 800, fontFamily: '"Outfit", sans-serif' }}>
            DC<span className="accent-text">.</span>
          </Link>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.65', margin: 0, maxWidth: '280px' }}>
            Building high-impact solutions at the convergence of Artificial Intelligence, workflow automation, and technical marketing systems.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
            <a 
              href="https://www.linkedin.com/in/div08/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-link" 
              aria-label="LinkedIn Profile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <FaLinkedinIn size={16} />
            </a>
            <a 
              href="https://github.com/div874" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-link" 
              aria-label="GitHub Profile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <FaGithub size={16} />
            </a>
            <a 
              href="mailto:divyansh.chandra.work@gmail.com" 
              className="social-icon-link" 
              aria-label="Send Email"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Navigation Links Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
            Navigation
          </h3>
          {mainNavigation.map(item => (
            <Link 
              key={item.href} 
              href={item.href} 
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                padding: '3px 0',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-color)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Featured Articles & Insights Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
            Featured Insights
          </h3>
          {featuredArticles.map(article => (
            <Link 
              key={article.href} 
              href={article.href} 
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.88rem',
                lineHeight: '1.45',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                padding: '2px 0',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={e => {
                const titleSpan = e.currentTarget.querySelector('.footer-article-title') as HTMLElement;
                if (titleSpan) titleSpan.style.color = 'var(--accent-color)';
              }}
              onMouseLeave={e => {
                const titleSpan = e.currentTarget.querySelector('.footer-article-title') as HTMLElement;
                if (titleSpan) titleSpan.style.color = 'var(--text-secondary)';
              }}
            >
              <span className="footer-article-title" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color 0.2s ease' }}>
                {article.label}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-color)', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {article.tag}
              </span>
            </Link>
          ))}
        </div>

        {/* Case Studies & Engineering Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
            Work & Case Studies
          </h3>
          {featuredWork.map(item => (
            <Link 
              key={item.href} 
              href={item.href} 
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.88rem',
                lineHeight: '1.45',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                padding: '2px 0',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={e => {
                const titleSpan = e.currentTarget.querySelector('.footer-work-title') as HTMLElement;
                if (titleSpan) titleSpan.style.color = 'var(--accent-color)';
              }}
              onMouseLeave={e => {
                const titleSpan = e.currentTarget.querySelector('.footer-work-title') as HTMLElement;
                if (titleSpan) titleSpan.style.color = 'var(--text-secondary)';
              }}
            >
              <span className="footer-work-title" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color 0.2s ease' }}>
                {item.label}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-color)', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {item.tag}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
          © {new Date().getFullYear()} Divyansh Chandra. All rights reserved.
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>
          AI Systems • Python Automation • SEO & Growth Engineering
        </p>
      </div>
    </footer>
  );
};

export default Footer;
