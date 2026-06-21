import { ProjectsPage } from '@/components/pages/ProjectsPage';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Projects | Karima Touhami',
  description: 'A curated collection of web applications, tools, and experiments built by Karima Touhami.',
  alternates: {
    canonical: 'https://karimatouhami.com/projects',
  },
};

export default function Page() {
  return <ProjectsPage />;
}
