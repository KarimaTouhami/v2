import React from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const PrivacyPage: React.FC = () => {
  usePageTitle('Privacy Policy');
  
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      <RevealOnScroll>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight font-inter">Privacy Policy</h1>
        <p className="text-neutral-500 text-lg mb-12">Last updated: December 6, 2025</p>
      </RevealOnScroll>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <RevealOnScroll delay={100}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Introduction</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Welcome to my portfolio website. I respect your privacy and am committed to protecting any personal data you share with me. This privacy policy explains how I collect, use, and safeguard your information when you visit this website.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Information I Collect</h2>
            <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">Personal Information</h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              When you contact me through the contact form or email, I may collect:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2 mb-6">
              <li>Your name</li>
              <li>Email address</li>
              <li>Message content</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">Automatically Collected Information</h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Like most websites, this site may automatically collect certain technical information:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>IP address (anonymized)</li>
            </ul>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">How I Use Your Information</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              I use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
              <li>To respond to your inquiries and messages</li>
              <li>To improve the website experience and functionality</li>
              <li>To analyze website traffic and user behavior</li>
              <li>To maintain security and prevent abuse</li>
            </ul>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Data Storage and Security</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I take reasonable measures to protect your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure. Your data is stored securely and is only retained for as long as necessary to fulfill the purposes outlined in this policy.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={500}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Third-Party Services</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              This website may use third-party services for hosting and analytics. These services may have their own privacy policies:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
              <li>Vercel (hosting)</li>
              <li>Google Analytics (if enabled)</li>
            </ul>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={600}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Your Rights</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 space-y-2">
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of communications</li>
            </ul>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={700}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Cookies</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              This website uses localStorage to save your theme preference (dark/light mode). This data is stored locally on your device and is not transmitted to any server.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={800}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Contact</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact me at{' '}
              <a href="mailto:karimatouhami246@gmail.com" className="text-neutral-900 dark:text-white font-medium hover:underline">
                karimatouhami246@gmail.com
              </a>
            </p>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
};
