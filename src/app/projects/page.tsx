import Projects from '@/components/Projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Divyansh Chandra',
  description: 'Explore AI, ML, automation, and analytics projects built by Divyansh Chandra.',
};

export default function ProjectsPage() {
  return (
    <div className="page-projects" style={{ paddingTop: '100px' }}>
      <Projects />
    </div>
  );
}
