import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills & Certifications | Divyansh Chandra',
  description: 'Technical skills, tools, and professional certifications of Divyansh Chandra.',
};

export default function SkillsPage() {
  return (
    <div className="page-skills" style={{ paddingTop: '100px' }}>
      <Skills />
      <Certifications />
    </div>
  );
}
