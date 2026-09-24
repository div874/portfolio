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

  const pageUrl = `https://www.divyanshchandra.online/projects/${slug}`;

  return {
    title: project.title,
    description: project.tagline || project.problem,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.title} | Divyansh Chandra`,
      description: project.tagline || project.problem,
      url: pageUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.tagline || project.problem,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectDetailPage slug={slug} />;
}
