import About from '@/components/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Divyansh Chandra',
  description: 'Learn more about Divyansh Chandra - AI, automation, and digital marketing specialist.',
};

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <About />
    </main>
  );
}
