import React from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { Mail, MapPin } from 'lucide-react';

export const ImprintPage: React.FC = () => {
  usePageTitle('Imprint');
  
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
      <RevealOnScroll>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight font-inter">Imprint</h1>
        <p className="text-neutral-500 text-lg mb-12">Legal information and contact details</p>
      </RevealOnScroll>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <RevealOnScroll delay={100}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-900 dark:text-white">Contact Information</h2>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">Karima Touhami</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-2">Software Development Engineer</p>
              
              <div className="flex items-start gap-3 mt-6 mb-4">
                <MapPin size={20} className="text-neutral-500 mt-1 flex-shrink-0" />
                <div className="text-neutral-600 dark:text-neutral-400">
                  <p>Tangier, Morocco</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={20} className="text-neutral-500 mt-1 flex-shrink-0" />
                <a 
                  href="mailto:karimatouhami246@gmail.com" 
                  className="text-neutral-900 dark:text-white font-medium hover:underline break-all"
                >
                  karimatouhami246@gmail.com
                </a>
              </div>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Responsible for Content</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Karima Touhami is responsible for all content on this website.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Disclaimer</h2>
            
            <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">Liability for Content</h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              The content of this website has been created with the utmost care. However, I cannot guarantee the accuracy, completeness, or timeliness of the content. I am responsible for my own content on these pages. However, I am not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
            </p>

            <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">Liability for Links</h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              This website contains links to external websites over which I have no control. Therefore, I cannot accept any liability for this external content. The respective provider or operator of the linked pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, permanent monitoring of the content of linked pages is unreasonable without concrete evidence of a legal violation.
            </p>

            <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">Copyright</h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              The content and works created by the site operator on these pages are subject to copyright law. The duplication, editing, distribution, and any kind of exploitation beyond the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Image Credits</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Images on this website are either created by me, used with permission, or sourced from free stock photo websites such as Unsplash. All images are used in accordance with their respective licenses.
            </p>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delay={500}>
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Contact</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              For any questions, concerns, or inquiries regarding this website or its content, please contact me via email at{' '}
              <a 
                href="mailto:karimatouhami246@gmail.com"
                className="text-neutral-900 dark:text-white font-medium hover:underline"
              >
                karimatouhami246@gmail.com
              </a>
              .
            </p>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
};
