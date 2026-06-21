import { ContactPage } from '@/components/pages/ContactPage';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Contact | Karima Touhami',
  description: 'Get in touch with Karima Touhami for freelance work, full-time opportunities, or collaboration.',
  alternates: {
    canonical: 'https://karimatouhami.com/contact',
  },
};

export default function Page() {
  return <ContactPage />;
}
