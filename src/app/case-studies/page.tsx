import type { Metadata } from 'next';
import Link from 'next/link';
import { caseStudiesData } from '@/data/caseStudiesData';
import { ArrowRight, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Studies | Divyansh Chandra',
  description: 'In-depth case studies showcasing technical SEO transformations, AI workflow automation, and multi-channel marketing growth by Divyansh Chandra.',
  alternates: {
    canonical: 'https://www.divyanshchandra.online/case-studies',
  },
  openGraph: {
    title: 'Case Studies | Divyansh Chandra',
    description: 'Real-world business outcomes, technical strategy breakdowns, and metrics-driven case studies across SEO, AI, and digital marketing.',
    url: 'https://www.divyanshchandra.online/case-studies',
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="page-case-studies" style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="content-wrapper" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <span className="section-label">Case Studies</span>
          <h1 className="accent-text" style={{ fontSize: '3rem', marginBottom: '16px', lineHeight: 1.15 }}>
            Real Problems, Data Strategies, Proven Outcomes
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', lineHeight: 1.6 }}>
            Detailed breakdowns of client and engineering projects—highlighting initial challenges, solution architecture, and measurable ROI metrics.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {caseStudiesData.map((cs) => (
            <article 
              key={cs.slug}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                transition: 'border-color 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <span 
                  style={{
                    backgroundColor: 'rgba(168, 85, 247, 0.12)',
                    color: 'var(--accent-color, #a855f7)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}
                >
                  {cs.category}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={15} /> Timeframe: {cs.timeframe}
                </span>
              </div>

              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 700 }}>
                  <Link href={`/case-studies/${cs.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {cs.title}
                  </Link>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.65 }}>
                  {cs.summary}
                </p>
              </div>

              {/* Metrics Highlights Bar */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                {cs.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-color, #a855f7)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <TrendingUp size={20} /> {m.value}
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, marginTop: '2px' }}>
                      {m.label}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '2px' }}>
                      {m.description}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {cs.technologies.map(t => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>

                <Link 
                  href={`/case-studies/${cs.slug}`}
                  className="glow-button"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', fontSize: '0.9rem' }}
                >
                  Read Full Case Study <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}
