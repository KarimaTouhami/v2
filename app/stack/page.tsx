import { StackPage } from '@/components/pages/StackPage';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Tech Stack | Karima Touhami',
  description: 'Technical skills and technologies used by Karima Touhami, including frontend, backend, and infrastructure.',
  alternates: {
    canonical: 'https://karimatouhami.com/stack',
  },
};

export default function Page() {
  return <StackPage />;
}
