'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getExperiences, defaultExperiences, ExperienceItem } from '@/utils/experiences';

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(defaultExperiences);

  useEffect(() => {
    getExperiences().then(data => {
      if (data && data.length > 0) {
        setExperiences(data);
      }
    });
  }, []);
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
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1.05rem' }}>Want to see the technical systems and architectures behind my work?</p>
        <Link href="/projects" className="glow-button" style={{ textDecoration: 'none', display: 'inline-block' }}>Explore Featured Projects →</Link>
      </motion.div>
    </section>
  );
};

export default Experience;
