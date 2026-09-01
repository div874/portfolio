import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

interface ProjectDetail {
  slug: string;
  title: string;
  category: string;
  role: string;
  type: string;
  tagline: string;
  problem: string;
  approach: string[];
  architecture?: string;
  technologies: string[];
  results: string[];
  learnings: string;
  links: { live: string; code: string };
}

const projectDetails: ProjectDetail[] = [
  {
    slug: 'wallcurry-ai-recommendation',
    title: 'Wallcurry AI Recommendation Model',
    category: 'AI & Recommendation Systems',
    role: 'AI/ML Developer',
    type: 'Personal Project',
    tagline: 'ML-powered product recommendation engine built for an art platform with 10,000+ mural listings.',
    problem:
      'Wallcurry, an art platform with 10,000+ mural listings, had no personalised discovery layer. Users browsed manually, engagement was low, and most works went unnoticed. Manual curation did not scale.',
    approach: [
      'Used ResNet-50 (pretrained on ImageNet) to extract 512-dimensional visual feature embeddings for every mural image.',
      'Built a FAISS index for fast approximate nearest-neighbour search across the embedding space.',
      'Layered collaborative filtering on top of visual similarity using implicit user behaviour signals (views, clicks, purchases).',
      'Exposed recommendations via a Flask REST API integrated into the React frontend.',
      'Validated accuracy through a user feedback loop — rating whether recommended murals matched their taste.',
    ],
    architecture:
      'Image → ResNet-50 → 512-dim embeddings → FAISS index → collaborative filtering re-ranking → Flask API → React UI',
    technologies: ['Python', 'TensorFlow', 'FAISS', 'Flask', 'React', 'ResNet-50', 'NumPy', 'Pandas'],
    results: [
      'Recommendation accuracy improved from 72% → 88% (user feedback validation)',
      '30% increase in mural purchases post-recommendation launch',
      '45% of users now discovering content through recommendations rather than manual search',
    ],
    learnings:
      'Building a recommendation engine taught me how to balance visual similarity with behavioural signals. Pure content-based filtering surfaces visually similar items but misses user intent — combining it with collaborative filtering significantly improved relevance. I also learned how FAISS enables real-time similarity search at scale without compromising latency.',
    links: { live: '#', code: '#' },
  },
  {
    slug: 'seo-reporting-automation',
    title: 'SEO Reporting Automation Dashboard',
    category: 'Automation & Data Engineering',
    role: 'Automation Developer',
    type: 'Professional Project',
    tagline: 'Automated SEO reporting pipeline that eliminated 6 hours of weekly manual work across 3 client accounts.',
    problem:
      'Manual SEO reporting consumed 6 hours per week across 3 client accounts. Reports were inconsistent, delayed, and dependent on manual data pulls from Google Search Console and GA4. Clients often received reports late, and issues were caught reactively.',
    approach: [
      'Connected to Google Search Console API and GA4 Reporting API using Python service account credentials.',
      'Built a Pandas pipeline to aggregate keyword-level data, calculate month-over-month (MoM) traffic, CTR, and ranking trends.',
      'Generated formatted PDF reports automatically using a templating system with client branding.',
      'Scheduled the pipeline to run every Monday morning, emailing reports directly to clients via SMTP.',
      'Built a Flask dashboard for internal monitoring of keyword trends and drop-off alerts in real time.',
    ],
    architecture:
      'GSC API + GA4 API → Python (Pandas) → MoM trend calculation → PDF generation → automated email delivery → Flask monitoring dashboard',
    technologies: ['Python', 'Google Search Console API', 'GA4 API', 'Pandas', 'Flask', 'SMTP', 'ReportLab'],
    results: [
      'Reporting time reduced from 6 hours → 15 minutes per week',
      'Tracked 45+ keywords across 3 accounts in real time',
      'Identified 8 ranking drop-off issues proactively — before clients noticed',
      'Client satisfaction score: 4.9/5 for faster, consistent reporting',
    ],
    learnings:
      'This project reinforced that automation\'s biggest value is not just speed — it\'s consistency. Manual reports introduce human error and delay. Once automated, the system caught issues I would have missed in manual review. I also learned how to work with OAuth2 and service account authentication for Google APIs at a production level.',
    links: { live: '#', code: '#' },
  },
];

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectDetails.find(p => p.slug === slug);

  if (!project) {
    return (
      <main style={{ paddingTop: '120px', minHeight: '60vh', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Project not found</h2>
        <Link to="/projects" style={{ color: 'var(--accent-color)', fontWeight: 600 }}>
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
            to="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              color: 'var(--text-secondary)', textDecoration: 'none',
              fontWeight: 500, fontSize: '0.9rem', marginBottom: '40px'
            }}
          >
            <ArrowLeft size={16} /> Browse All Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span style={{
            fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '2px'
          }}>
            {project.category}
          </span>
          <h1 style={{
            fontFamily: '"Outfit", sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1,
            margin: '12px 0 16px'
          }}>
            {project.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '24px' }}>
            {project.tagline}
          </p>

          {/* Role & Type badges */}
          <div style={{ display: 'flex', gap: '32px', marginBottom: '48px', paddingBottom: '32px', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Role</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 700 }}>{project.role}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Type</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 700 }}>{project.type}</div>
            </div>
          </div>
        </motion.div>

        {/* Sections */}
        {[
          {
            label: 'Problem',
            content: <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>{project.problem}</p>,
          },
          {
            label: 'Approach',
            content: (
              <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                {project.approach.map((step, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>{step}</li>
                ))}
              </ol>
            ),
          },
          ...(project.architecture ? [{
            label: 'Architecture',
            content: (
              <div style={{
                background: 'var(--card-bg)', border: '1px solid var(--border-color)',
                borderRadius: '10px', padding: '16px 20px',
                fontFamily: 'monospace', fontSize: '0.9rem',
                color: 'var(--text-primary)', lineHeight: 1.6
              }}>
                {project.architecture}
              </div>
            ),
          }] : []),
          {
            label: 'Technologies',
            content: (
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                {project.technologies.map(t => (
                  <span key={t} className="tech-tag" style={{ fontSize: '0.85rem' }}>{t}</span>
                ))}
              </div>
            ),
          },
          {
            label: 'Results',
            content: (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
                {project.results.map((r, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '2px' }}>✦</span>
                    {r}
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

        {/* Footer actions */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingTop: '32px', borderTop: '1px solid var(--border-color)' }}>
          {project.links.code !== '#' && (
            <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="project-link">
              <FaGithub size={18} /> Source Code
            </a>
          )}
          {project.links.live !== '#' && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="project-link">
              <ExternalLink size={18} /> Live Demo
            </a>
          )}
          <Link to="/projects" style={{
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
