'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const ScrollReveal = dynamic(() => import('./ScrollReveal'), { ssr: false });

const highlights = [
  { value: '15+', label: 'Projects Built' },
  { value: '3+', label: 'Internships' },
  { value: '12+', label: 'Industry Verticals' },
  { value: '10,000+', label: 'Keywords Analyzed' },
];

const About = () => {
  return (
    <section className="section" id="about" style={{ paddingTop: '40px' }}>
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
            src="/about_mascot.webp"
            alt="Coding Mascot"
            className="about-mascot"
            width="560"
            height="373"
            loading="lazy"
          />
        </motion.div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="about-content"
          >
            {/* Recruiter Fast-Track Card (Role, Strengths, Strongest Achievement) */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              borderRadius: '16px',
              padding: '24px 28px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span style={{ 
                  background: 'var(--accent-color, #a855f7)', 
                  color: '#fff', 
                  fontSize: '0.72rem', 
                  fontWeight: 700, 
                  letterSpacing: '1px', 
                  padding: '3px 10px', 
                  borderRadius: '20px',
                  textTransform: 'uppercase'
                }}>
                  Recruiter Fast-Track
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>• Executive Overview</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Role: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>Marketing Technology & Automation Specialist</span>
                </div>
                <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Core Strengths: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>Data-driven marketing solutions, Python automation workflows, SEO systems, and AI applications connecting technology with business growth.</span>
                </div>
                <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Strongest Achievement: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    <strong>Published IEEE author</strong> (6th CONIT 2026, Multilingual Transformer Models) and built automated AI pipelines delivering <strong>+240% organic growth</strong> across 12+ industry verticals.
                  </span>
                </div>
              </div>
            </div>

            <div className="about-body">
              <p>
                I build software at the intersection of <strong>AI, automated data engineering, and scalable growth systems</strong>. Rather than treating AI as a novelty, I turn complex manual processes into deterministic, production-ready workflows that generate measurable business ROI.
              </p>
              <p>
                Currently, I lead AI-powered content and technical SEO automation for <strong style={{ color: 'var(--text-primary)' }}>1page.info</strong> across <strong style={{ color: 'var(--accent-color)' }}>12+ industry verticals</strong>—architecting programmatic keyword mapping, semantic internal linking trees, and automated reporting systems.
              </p>
            </div>

            {/* Machine & Human Entity Knowledge Section */}
            <div style={{
              background: 'var(--bg-alt, #f8f9fa)',
              border: '1px solid var(--border-color, #e5e5e5)',
              borderRadius: '8px',
              padding: '20px 24px',
              marginTop: '20px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.88rem',
              lineHeight: 1.6
            }}>
              <div style={{ fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px', fontSize: '0.75rem', color: '#666' }}>
                [ ENTITY KNOWLEDGE SUMMARY ]
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div><strong>Role:</strong> AI & Automation Specialist</div>
                <div><strong>Institution:</strong> NMIMS (MBA Tech)</div>
                <div><strong>Focus:</strong> AI Agents, RAG, Automation, SEO</div>
                <div><strong>Affiliation:</strong> 1page.info</div>
              </div>
              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e5e5e5', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.82rem' }}>
                <a href="https://www.linkedin.com/in/div08/" target="_blank" rel="noreferrer" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 600 }}>LinkedIn ↗</a>
                <a href="https://github.com/div874" target="_blank" rel="noreferrer" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 600 }}>GitHub ↗</a>
                <a href="https://www.divyanshchandra.online/" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 600 }}>Portfolio ↗</a>
              </div>
            </div>

            <Link
              href="/about"
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
