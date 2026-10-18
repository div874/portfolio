import ProjectDetailPage from '@/views/ProjectDetailPage';
import { getProjects, getProjectBySlug } from '@/utils/projects';
import type { Metadata } from 'next';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
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
  const project = await getProjectBySlug(slug);
  return <ProjectDetailPage slug={slug} initialProject={project} />;
}
