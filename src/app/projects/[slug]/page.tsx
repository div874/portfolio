import ProjectDetailPage from '@/views/ProjectDetailPage';
import { projectDetails } from '@/data/projectsData';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return projectDetails.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectDetails.find(p => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Divyansh Chandra`,
    description: project.tagline,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectDetailPage slug={slug} />;
}
