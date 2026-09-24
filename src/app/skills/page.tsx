import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Skills & Certifications',
  description: 'Technical expertise of Divyansh Chandra: Python, TensorFlow, FAISS, LangChain, Next.js, Search Console API, GA4, technical SEO, and automation frameworks.',
  alternates: {
    canonical: 'https://www.divyanshchandra.online/skills',
  },
  openGraph: {
    title: 'Technical Skills & Certifications | Divyansh Chandra',
    description: 'Technical skills, AI frameworks, automation toolkits, and industry certifications held by Divyansh Chandra.',
    url: 'https://www.divyanshchandra.online/skills',
  },
};

export default function SkillsPage() {
  return (
    <div className="page-skills" style={{ paddingTop: '100px' }}>
      <Skills />
      <Certifications />
    </div>
  );
}
