import Experience from '@/components/Experience';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience | Divyansh Chandra',
  description: 'Professional experience, roles, and achievements of Divyansh Chandra.',
};

export default function ExperiencePage() {
  return (
    <div className="page-experience" style={{ paddingTop: '100px' }}>
      <Experience />
    </div>
  );
}
