import { use } from 'react';
import { ProjectDetailPage } from '@/components/pages/ProjectDetailPage';
import { PROJECTS } from '@/data/projects';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: String(project.id) }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const project = PROJECTS.find(p => p.id === Number(params.id));
  if (!project) return {};
  return {
    title: `${project.title} | Karima Touhami`,
    description: project.description,
    alternates: {
      canonical: `https://karimatouhami.com/projects/${project.id}`,
    },
  };
}

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = PROJECTS.find(p => p.id === Number(id));
  if (!project) notFound();
  return <ProjectDetailPage projectId={id} />;
}
