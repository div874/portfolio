import Experience from '@/components/Experience';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Experience & Track Record',
  description: 'Explore Divyansh Chandra\'s professional experience, internships, B2B consulting roles, technical SEO achievements, and client growth results.',
  alternates: {
    canonical: 'https://www.divyanshchandra.online/experience',
  },
  openGraph: {
    title: 'Professional Experience | Divyansh Chandra',
    description: 'Track record of 3+ internships, B2B growth optimization, content pipelines, and technical SEO achievements across 12+ industries.',
    url: 'https://www.divyanshchandra.online/experience',
  },
};

export default function ExperiencePage() {
  return (
    <div className="page-experience" style={{ paddingTop: '100px' }}>
      <Experience />
    </div>
  );
}
