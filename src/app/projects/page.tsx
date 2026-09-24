import Projects from '@/components/Projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI & Automation Projects',
  description: 'Featured engineering projects by Divyansh Chandra, including AI product recommendation models, automated SEO reporting tools, and LLM automation pipelines.',
  alternates: {
    canonical: 'https://www.divyanshchandra.online/projects',
  },
  openGraph: {
    title: 'Featured Projects | Divyansh Chandra',
    description: 'Explore AI recommendation models, Python ETL pipelines, Search Console & GA4 automated reporting dashboards built by Divyansh Chandra.',
    url: 'https://www.divyanshchandra.online/projects',
  },
};

export default function ProjectsPage() {
  return (
    <div className="page-projects" style={{ paddingTop: '100px' }}>
      <Projects />
    </div>
  );
}
