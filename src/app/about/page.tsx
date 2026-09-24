import About from '@/components/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Divyansh Chandra - working at the intersection of Generative AI, Python workflow automation, technical SEO, and digital marketing.',
  alternates: {
    canonical: 'https://www.divyanshchandra.online/about',
  },
  openGraph: {
    title: 'About Divyansh Chandra | AI & Automation Specialist',
    description: 'Working at the intersection of AI, automation, and digital marketing - building practical systems that make businesses smarter, faster, and more scalable.',
    url: 'https://www.divyanshchandra.online/about',
  },
};

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <About />
    </main>
  );
}
