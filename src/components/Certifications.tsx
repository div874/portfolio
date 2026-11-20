'use client';

import { motion } from 'framer-motion';
import { Download, Award, Trophy, Users, HeartHandshake } from 'lucide-react';

const certs = [
  { 
    title: 'Oracle Agentic AI Foundation Associate', 
    issuer: 'Oracle', 
    date: 'Certified / Professional',
    description: 'Autonomous multi-agent workflows, tool integration, and agentic reasoning architectures.'
  },
  { 
    title: 'Agentic AI on Google Cloud', 
    issuer: 'Google Cloud (Google Skills)', 
    date: 'Certified / Professional',
    description: 'Building, orchestrating, and deploying enterprise-grade AI agents and grounding pipelines on GCP.'
  },
  { 
    title: 'Digital Marketing Certification', 
    issuer: 'HubSpot Academy', 
    date: 'Jan 2026',
    description: 'Inbound marketing, conversion optimization, content strategy, and customer journey funnels.'
  },
  { 
    title: 'NISM Certification in Securities Market', 
    issuer: 'National Institute of Securities Markets (NISM)', 
    date: 'Sep 2025',
    description: 'Financial market operations, capital markets compliance, and risk analytics.'
  }
];

const hackathons = [
  {
    title: 'Codex 48 National Hackathon',
    highlight: 'Top 50 Teams (Out of 1,000+ Teams)',
    date: 'National Level',
    description: 'Competed among 1,000+ engineering teams nationwide, rapidly architecting and pitching a technology solution.'
  },
  {
    title: 'Zero to Chat Hackathon',
    highlight: 'Participant & Builder',
    date: 'CometChat',
    description: 'Built and integrated real-time interactive chat workflows and communication architectures.'
  }
];

const leadership = [
  { 
    role: 'Community Service Director', 
    org: 'Rotaract Club of Navi Mumbai Samaritans', 
    date: 'Sep 2024 – Jul 2025',
    description: 'Directed strategic marketing campaigns boosting club visibility; organized workshops and community service events.'
  },
  { 
    role: 'Core Member', 
    org: 'Manthan Club', 
    date: 'Jun 2024 – Jun 2025',
    description: 'Built a student community around Android Development and Machine Learning through peer workshops and talks.'
  },
  { 
    role: 'Volunteer', 
    org: 'Robin Hood Army', 
    date: 'May 2023 – Present',
    description: 'Taught underprivileged children and supported meal distribution drives across local communities.'
  }
];

const Certifications = () => {
  return (
    <section className="section" id="cv-section" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '48px' }}
      >
        <span className="section-label">CREDENTIALS & LEADERSHIP</span>
        <h2 className="accent-text" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.2rem)', marginBottom: '14px' }}>
          Certifications, Honors & Leadership
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '720px', marginBottom: '24px', lineHeight: 1.6 }}>
          Professional accreditations in Agentic AI and Marketing Analytics, competitive hackathon standings, and community leadership roles.
        </p>
        <a
          href="/Divyansh_Chandra_Resume.pdf"
          download="Divyansh_Chandra_Resume.pdf"
          className="glow-button"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '12px 24px', fontSize: '0.95rem' }}
        >
          <span>Download Official Resume PDF</span>
          <Download size={16} />
        </a>
      </motion.div>

      {/* Grid: Certifications, Hackathons, Leadership */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        
        {/* Column 1: Certifications */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--glass-border)' }}>
            <Award size={22} style={{ color: 'var(--accent-color)' }} />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
              Certifications
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {certs.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card"
                style={{ padding: '20px', borderRadius: '14px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: 0, fontWeight: 700 }}>
                    {cert.title}
                  </h4>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                    {cert.date}
                  </span>
                </div>
                <div style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                  {cert.issuer}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Column 2: Hackathons & Honors */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--glass-border)' }}>
            <Trophy size={22} style={{ color: '#f59e0b' }} />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
              Hackathons & Honors
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {hackathons.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card"
                style={{ padding: '20px', borderRadius: '14px', borderLeft: '3px solid #f59e0b' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: 0, fontWeight: 700 }}>
                    {h.title}
                  </h4>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                    {h.date}
                  </span>
                </div>
                <div style={{ color: '#f59e0b', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                  ★ {h.highlight}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                  {h.description}
                </p>
              </motion.div>
            ))}

            {/* Research Highlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ padding: '20px', borderRadius: '14px', borderLeft: '3px solid var(--accent-color)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: 0, fontWeight: 700 }}>
                  IEEE Research Publication
                </h4>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>2026</span>
              </div>
              <div style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                6th CONIT 2026, IEEE [DOI: 11621397]
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0 0 10px', lineHeight: 1.5 }}>
                Multilingual E-Commerce Complaint Analysis and Automated Response Generation using Transformer Models.
              </p>
              <a
                href="https://ieeexplore.ieee.org/abstract/document/11621397"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'underline' }}
              >
                View on IEEE Xplore ↗
              </a>
            </motion.div>
          </div>
        </div>

        {/* Column 3: Leadership & Extracurriculars */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--glass-border)' }}>
            <Users size={22} style={{ color: '#3b82f6' }} />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
              Leadership & Community
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {leadership.map((lead, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card"
                style={{ padding: '20px', borderRadius: '14px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: 0, fontWeight: 700 }}>
                    {lead.role}
                  </h4>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                    {lead.date}
                  </span>
                </div>
                <div style={{ color: 'var(--accent-secondary, #3b82f6)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                  {lead.org}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                  {lead.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Certifications;
