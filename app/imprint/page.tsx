import { ImprintPage } from '@/components/pages/ImprintPage';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Imprint | Karima Touhami',
  description: 'Legal information and contact details for Karima Touhami.',
  alternates: {
    canonical: 'https://karimatouhami.com/imprint',
  },
};

export default function Page() {
  return <ImprintPage />;
}
