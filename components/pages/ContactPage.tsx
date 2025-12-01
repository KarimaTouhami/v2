import React from 'react';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const ContactPage: React.FC = () => {
  usePageTitle('Contact');
  
  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 max-w-4xl mx-auto">
      <RevealOnScroll>
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 font-inter text-neutral-900 dark:text-white">Get in touch</h1>
          <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            I&apos;m currently available for freelance work or full-time positions. 
            Reach out directly via email or connect on social media.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            href="mailto:karimatouhami246@gmail.com" 
            className="group p-8 bg-white dark:bg-neutral-900 rounded-3xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-300/30 dark:hover:shadow-black/50 duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                <Mail size={24} className="text-black dark:text-white" />
              </div>
              <h3 className="text-xl font-bold font-inter text-neutral-900 dark:text-white">Email</h3>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 mb-2">Drop me a line</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:underline decoration-2 underline-offset-4 break-all">karimatouhami246@gmail.com</p>
          </a>

          <a 
            href="https://www.linkedin.com/in/karimatouhami/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group p-8 bg-white dark:bg-neutral-900 rounded-3xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-300/30 dark:hover:shadow-black/50 duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                <Linkedin size={24} className="text-black dark:text-white" />
              </div>
              <h3 className="text-xl font-bold font-inter text-neutral-900 dark:text-white">LinkedIn</h3>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 mb-2">Let&apos;s connect</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:underline decoration-2 underline-offset-4">Karima Touhami</p>
          </a>

          <a 
            href="https://github.com/KarimaTouhami" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group p-8 bg-white dark:bg-neutral-900 rounded-3xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-300/30 dark:hover:shadow-black/50 duration-300"
          >
             <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                <Github size={24} className="text-black dark:text-white" />
              </div>
              <h3 className="text-xl font-bold font-inter text-neutral-900 dark:text-white">GitHub</h3>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 mb-2">Check my code</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:underline decoration-2 underline-offset-4">@KarimaTouhami</p>
          </a>

          <div className="p-8 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-3xl border-2 border-green-200 dark:border-green-900/40">
             <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm">
                <MapPin size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold font-inter text-neutral-900 dark:text-white">Location</h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 mb-3">Tangier, Morocco</p>
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Available for new projects
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};
