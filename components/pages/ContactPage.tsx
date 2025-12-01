import React from 'react';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const ContactPage: React.FC = () => {
  usePageTitle('Contact');
  
  return (
    <div className="pt-32 md:pt-40 pb-20 px-6 max-w-4xl mx-auto">
      <RevealOnScroll>
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 md:mb-8 font-inter">Get in touch</h1>
          <p className="text-lg md:text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            I&apos;m currently available for freelance work or full-time positions. 
            Reach out directly via email or connect on social media.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <a 
            href="mailto:karima@example.com" 
            className="group p-6 md:p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-none"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-white dark:bg-neutral-800 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                <Mail size={24} className="text-black dark:text-white" />
              </div>
              <h3 className="text-xl font-bold font-inter dark:text-white">Email</h3>
            </div>
            <p className="text-neutral-500 mb-2">Drop me a line</p>
            <p className="text-lg font-medium text-neutral-900 dark:text-white group-hover:underline decoration-1 underline-offset-4 break-all">karima@example.com</p>
          </a>

          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group p-6 md:p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-none"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-white dark:bg-neutral-800 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                <Linkedin size={24} className="text-black dark:text-white" />
              </div>
              <h3 className="text-xl font-bold font-inter dark:text-white">LinkedIn</h3>
            </div>
            <p className="text-neutral-500 mb-2">Let&apos;s connect</p>
            <p className="text-lg font-medium text-neutral-900 dark:text-white group-hover:underline decoration-1 underline-offset-4">Karima Touhami</p>
          </a>

          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group p-6 md:p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-none"
          >
             <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-white dark:bg-neutral-800 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                <Github size={24} className="text-black dark:text-white" />
              </div>
              <h3 className="text-xl font-bold font-inter dark:text-white">GitHub</h3>
            </div>
            <p className="text-neutral-500 mb-2">Check my code</p>
            <p className="text-lg font-medium text-neutral-900 dark:text-white group-hover:underline decoration-1 underline-offset-4">@KarimaTouhami</p>
          </a>

          <div className="p-6 md:p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
             <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-white dark:bg-neutral-800 rounded-full shadow-sm">
                <MapPin size={24} className="text-black dark:text-white" />
              </div>
              <h3 className="text-xl font-bold font-inter dark:text-white">Location</h3>
            </div>
            <p className="text-neutral-500 mb-2">Tangier, Morocco</p>
            <div className="flex items-center gap-2 text-green-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Available for new projects
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};
