import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { caseStudiesData } from '@/data/caseStudiesData';
import { ArrowLeft, CheckCircle2, TrendingUp, Cpu, Calendar, Target } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudiesData.find((item) => item.slug === slug);
  if (!cs) return {};

  return {
    title: `${cs.title} | Case Study`,
    description: cs.summary,
    alternates: {
      canonical: `https://www.divyanshchandra.online/case-studies/${cs.slug}`,
    },
    openGraph: {
      title: `${cs.title} | Divyansh Chandra`,
      description: cs.summary,
      url: `https://www.divyanshchandra.online/case-studies/${cs.slug}`,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const cs = caseStudiesData.find((item) => item.slug === slug);

  if (!cs) {
    notFound();
  }

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="content-wrapper" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Back Link */}
        <Link 
          href="/case-studies"
          style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', marginBottom: '32px' }}
        >
          <ArrowLeft size={16} /> Back to all case studies
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', color: 'var(--accent-color, #a855f7)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 600 }}>
              {cs.category}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>• {cs.clientIndustry}</span>
          </div>

          <h1 className="accent-text" style={{ fontSize: '2.5rem', lineHeight: 1.2, marginBottom: '20px', fontWeight: 800 }}>
            {cs.title}
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            {cs.summary}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '50px',
            padding: '28px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '16px'
          }}
        >
          {cs.metrics.map((m, idx) => (
            <div key={idx}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-color, #a855f7)' }}>
                {m.value}
              </div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem', marginTop: '4px' }}>
                {m.label}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '2px' }}>
                {m.description}
              </div>
            </div>
          ))}
        </div>

        {/* Section: Challenge */}
        <section style={{ marginBottom: '44px' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Target style={{ color: 'var(--accent-color)' }} size={22} /> The Challenge
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cs.challenge.map((item, i) => (
              <p key={i} style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, paddingLeft: '16px', borderLeft: '2px solid rgba(255, 255, 255, 0.1)' }}>
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* Section: Strategy & Solution */}
        <section style={{ marginBottom: '44px' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu style={{ color: 'var(--accent-color)' }} size={22} /> Strategy & Execution
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {cs.strategy.map((item, i) => (
              <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, display: 'flex', gap: '12px' }}>
                <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>0{i+1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section: Implementation Highlights */}
        <section style={{ marginBottom: '44px' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '16px' }}>Implementation Details</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cs.implementation.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '4px' }} />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Key Takeaways */}
        <section style={{ marginBottom: '60px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '16px' }}>Key Takeaways</h2>
          <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cs.keyTakeaways.map((t, i) => (
              <li key={i} style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{t}</li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '16px' }}>Want similar results for your business?</h3>
          <a href="/#contact" className="glow-button" style={{ textDecoration: 'none' }}>Schedule a Consultation</a>
        </div>

      </div>
    </main>
  );
}
