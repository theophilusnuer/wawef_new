
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/sanity/lib/getProjectBySlug';
import ProjectDetailsClient from './ProjectDetailsClient';

interface ProjectPageProps {
 params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params; 
  const { slug } = resolvedParams;
  const project = await getProjectBySlug(slug);
  if (!project) {
    notFound();
    return null;
  }
  return <ProjectDetailsClient project={project} />;
}
