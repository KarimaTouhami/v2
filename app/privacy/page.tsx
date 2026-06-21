import { PrivacyPage } from '@/components/pages/PrivacyPage';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Privacy Policy | Karima Touhami',
  description: 'Privacy policy for Karima Touhami\'s portfolio website.',
  alternates: {
    canonical: 'https://karimatouhami.com/privacy',
  },
};

export default function Page() {
  return <PrivacyPage />;
}
