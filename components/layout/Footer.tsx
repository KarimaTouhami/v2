import React from 'react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { CopyEmailButton } from '@/components/ui/CopyEmailButton';
import { SocialButton } from '@/components/ui/SocialButton';

export const Footer: React.FC = () => (
  <footer className="bg-neutral-50 dark:bg-neutral-950 pt-20 md:pt-32 pb-10 border-t border-neutral-200 dark:border-neutral-900 relative z-10">
    <div className="max-w-6xl mx-auto px-6">
      <RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight font-inter">Let&apos;s build something <br/>extraordinary.</h3>
            <p className="text-neutral-500 max-w-md text-lg mb-8">
              I&apos;m focused on building accessible, pixel-perfect, and performant web experiences.
              Currently open for full-time opportunities.
            </p>
            <CopyEmailButton />
          </div>
          <div className="flex flex-col md:items-end justify-center gap-8">
            <a href="mailto:contact@karima.dev" className="text-2xl md:text-3xl font-medium hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors flex items-center gap-4 group font-inter break-all">
              contact@karima.dev <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={32} />
            </a>
            <div className="flex gap-4">
              <SocialButton icon={<Github size={20} />} label="GitHub" />
              <SocialButton icon={<Linkedin size={20} />} label="LinkedIn" />
              <SocialButton icon={<Mail size={20} />} label="Email" />
            </div>
          </div>
        </div>
      </RevealOnScroll>
      
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-200 dark:border-neutral-900 text-sm text-neutral-500 gap-4">
        <p>© 2025 Karima Touhami. Crafted with precision.</p>
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Privacy</span>
          <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Imprint</span>
        </div>
      </div>
    </div>
  </footer>
);
