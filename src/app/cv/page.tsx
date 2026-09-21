import CVPage from '@/views/CVPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curriculum Vitae | Divyansh Chandra',
  description: 'Download official resume and explore background of Divyansh Chandra.',
};

export default function Page() {
  return <CVPage />;
}
