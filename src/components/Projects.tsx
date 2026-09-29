'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import Link from 'next/link';
import { projectDetails, PROJECT_CATEGORIES, ProjectDetail } from '@/data/projectsData';

const projectColors = [
  'linear-gradient(135deg, #52525b 0%, #3f3f46 100%)',
  'linear-gradient(135deg, #71717a 0%, #52525b 100%)',
  'linear-gradient(135deg, #3f3f46 0%, #ec4899 100%)',
  'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
];

interface ProjectsProps {
  showFilter?: boolean;
}

const Projects = ({ showFilter = true }: ProjectsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects = activeCategory === 'All'
    ? projectDetails
    : projectDetails.filter(p => p.category === activeCategory);

  return (
    <section className="section" id="projects" style={{ padding: '80px 10%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'left', marginBottom: '40px' }}
      >
        <span className="section-label">03</span>
        <h2 className="accent-text" style={{ fontSize: '3rem', marginBottom: '16px' }}>Projects Hub</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '650px' }}>
          Explore engineered solutions categorized across AI, SEO, Digital Marketing, and Web Development. Real metrics, practical problem solving.
        </p>
      </motion.div>

      {/* Category Filter Tabs */}
      {showFilter && (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '50px' }}>
          {PROJECT_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '30px',
                border: activeCategory === cat ? '1px solid var(--accent-color)' : '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: activeCategory === cat ? 'var(--accent-color-transparent, rgba(168, 85, 247, 0.15))' : 'rgba(255, 255, 255, 0.03)',
                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: activeCategory === cat ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {filteredProjects.map((project, index) => (
          <motion.div 
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="project-row"
            style={{ display: 'flex', flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', gap: '40px', alignItems: 'stretch', flexWrap: 'wrap' }}
          >
            {/* Visual fallback card */}
            <div className="project-image-wrapper" style={{ flex: '1 1 380px', overflow: 'hidden', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative', minHeight: '300px' }}>
              <div 
                className="project-image-fallback"
                style={{ 
                  background: projectColors[index % projectColors.length],
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '30px'
                }}
              >
                <span style={{ fontSize: '4rem', fontWeight: 800, color: 'rgba(255,255,255,0.15)', fontFamily: '"Outfit", sans-serif', lineHeight: 1 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
                  {project.category}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{project.category}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>• {project.type}</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', lineHeight: 1.25, fontWeight: 700 }}>{project.title}</h3>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {project.tagline}
              </p>

              {/* Impact metrics */}
              {project.results && project.results.length > 0 && (
                <div style={{ marginTop: '4px' }}>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.82rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Impact Highlights:</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {project.results.slice(0, 3).map((metric, i) => (
                      <li key={i} style={{ color: 'var(--accent-color)', fontSize: '0.88rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ flexShrink: 0, marginTop: '2px' }}>✦</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                {project.technologies.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: '20px', marginTop: '12px', alignItems: 'center' }}>
                <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none', color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  View Project Detail <ArrowRight size={16} />
                </Link>
                {project.links.code && project.links.code !== '#' && (
                  <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="project-link" style={{ fontSize: '0.85rem' }}>
                    <FaGithub size={16} /> Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginTop: '70px', textAlign: 'center' }}
      >
        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '20px' }}>Interested in custom project development?</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="/#contact" className="glow-button" style={{ textDecoration: 'none' }}>Get in Touch</a>
          <a href="https://github.com/div874" target="_blank" rel="noopener noreferrer" className="social-icon-link" style={{ width: 'auto', padding: '0 20px', borderRadius: '30px', display: 'flex', gap: '8px' }}>
            <FaGithub size={18} /> Explore GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
