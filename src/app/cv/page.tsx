import CVPage from '@/views/CVPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curriculum Vitae & Resume',
  description: 'Download the official resume of Divyansh Chandra - AI, Automation & Digital Marketing Specialist. Inspect experience, education, and credentials.',
  alternates: {
    canonical: 'https://www.divyanshchandra.online/cv',
  },
  openGraph: {
    title: 'Curriculum Vitae & Resume | Divyansh Chandra',
    description: 'Download the official resume and CV of Divyansh Chandra - AI, Automation & Digital Marketing Developer.',
    url: 'https://www.divyanshchandra.online/cv',
  },
};

export default function Page() {
  return <CVPage />;
}
