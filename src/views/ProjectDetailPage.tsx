'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

import { projectDetails, ProjectDetail } from '@/data/projectsData';
import { getProjectBySlug, sanitizeExternalUrl } from '@/utils/projects';
import { AttachmentList } from '@/components/AttachmentList';

interface ProjectDetailPageProps {
  slug?: string;
  initialProject?: ProjectDetail | null;
}

const ProjectDetailPage = ({ slug: propSlug, initialProject }: ProjectDetailPageProps) => {
  const params = useParams();
  const slug = propSlug || (params?.slug as string);
  const [project, setProject] = useState<ProjectDetail | null>(
    initialProject || projectDetails.find(p => p.slug === slug) || null
  );
  const [loading, setLoading] = useState(!project);

  useEffect(() => {
    let mounted = true;
    if (slug) {
      getProjectBySlug(slug).then(p => {
        if (mounted) {
          if (p) setProject(p);
          setLoading(false);
        }
      }).catch(() => {
        if (mounted) setLoading(false);
      });
    } else {
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main style={{ paddingTop: '160px', minHeight: '60vh', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Loading project details...</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main style={{ paddingTop: '120px', minHeight: '60vh', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Project not found</h2>
        <Link href="/projects" style={{ color: 'var(--accent-color)', fontWeight: 600 }}>
          ← Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="content-wrapper" style={{ maxWidth: '820px', margin: '0 auto' }}>

        {/* Back nav */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link
            href="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              color: 'var(--text-secondary)', textDecoration: 'none',
              fontWeight: 500, fontSize: '0.9rem', marginBottom: '40px'
            }}
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px',
              textTransform: 'uppercase', color: 'var(--accent-color)',
            }}>
              {project.category}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span className="project-tag">{project.role}</span>
            <span className="project-tag">{project.type}</span>
          </div>

          <h1 style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}>
            {project.title}
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {project.tagline}
          </p>

          {project.image && (
            <div style={{ marginTop: '24px', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-color)', maxHeight: '420px' }}>
              <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          )}
        </motion.div>

        {/* Main Content Sections */}
        {[
          {
            label: 'The Problem',
            content: <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>{project.problem}</p>,
          },
          {
            label: 'The Solution & Approach',
            content: (
              <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.approach.map((step, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.98rem' }}>
                    {step}
                  </li>
                ))}
              </ul>
            ),
          },
          ...(project.architecture
            ? [
                {
                  label: 'System Architecture',
                  content: (
                    <div className="glass-card" style={{ padding: '20px 24px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--accent-color)', wordBreak: 'break-word' as const }}>
                      {project.architecture}
                    </div>
                  ),
                },
              ]
            : []),
          {
            label: 'Tech Stack',
            content: (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {project.technologies.map(tech => (
                  <span key={tech} className="project-tag" style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
                    {tech}
                  </span>
                ))}
              </div>
            ),
          },
          {
            label: 'Impact & Results',
            content: (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.results.map((res, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '2px' }}>✦</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem' }}>{res}</span>
                  </li>
                ))}
              </ul>
            ),
          },
          {
            label: 'What I Learned',
            content: <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>{project.learnings}</p>,
          },
        ].map((section, i) => (
          <motion.section
            key={section.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            style={{ marginBottom: '48px' }}
          >
            <h2 style={{
              fontFamily: '"Outfit", sans-serif', fontSize: '1.2rem', fontWeight: 700,
              color: 'var(--text-primary)', marginBottom: '16px',
              textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              {section.label}
            </h2>
            {section.content}
          </motion.section>
        ))}

        {/* Project Attachments & Presentations */}
        {project.attachments && project.attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AttachmentList
              attachments={project.attachments}
              title="Project Presentations & Documents"
            />
          </motion.div>
        )}

        {/* Footer actions */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingTop: '32px', borderTop: '1px solid var(--border-color)' }}>
          {Boolean(sanitizeExternalUrl(project.links.code)) && (
            <a href={sanitizeExternalUrl(project.links.code)} target="_blank" rel="noopener noreferrer" className="project-link">
              <FaGithub size={18} /> Source Code
            </a>
          )}
          {Boolean(sanitizeExternalUrl(project.links.live)) && (
            <a href={sanitizeExternalUrl(project.links.live)} target="_blank" rel="noopener noreferrer" className="project-link">
              <ExternalLink size={18} /> Live Demo
            </a>
          )}
          <Link href="/projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: 'var(--text-secondary)', textDecoration: 'none',
            fontWeight: 600, fontSize: '0.95rem'
          }}>
            ← Browse All Projects
          </Link>
        </div>

      </div>
    </main>
  );
};

export default ProjectDetailPage;
