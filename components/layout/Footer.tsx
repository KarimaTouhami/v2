import React from 'react';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import { FaMedium } from 'react-icons/fa';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { CopyEmailButton } from '@/components/ui/CopyEmailButton';
import { SocialButton } from '@/components/ui/SocialButton';

interface FooterProps {
  setActivePage?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => (
  <footer className="bg-neutral-50 dark:bg-black/40 pt-24 md:pt-32 pb-12 border-t border-neutral-200 dark:border-neutral-800 relative z-10">
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
            <a href="mailto:karimatouhami246@gmail.com" className="text-xl md:text-3xl font-medium hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors flex items-center gap-4 group font-inter break-all">
              karimatouhami246@gmail.com <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={32} />
            </a>
            <div className="flex gap-4">
              <SocialButton icon={<Github size={20} />} href="https://github.com/KarimaTouhami" label="GitHub" />
              <SocialButton icon={<Linkedin size={20} />} href="https://linkedin.com/in/karimatouhami" label="LinkedIn" />
              <SocialButton icon={<FaMedium size={20} />} href="https://medium.com/@karimatouhami" label="Medium" />
            </div>
          </div>
        </div>
      </RevealOnScroll>
      
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-200 dark:border-neutral-900 text-sm text-neutral-500 gap-4">
        <p>© 2025 Karima Touhami. Crafted with precision.</p>
        <div className="flex gap-6">
          <button 
            onClick={() => setActivePage?.('privacy')}
            className="cursor-pointer hover:text-black dark:hover:text-white transition-colors"
          >
            Privacy
          </button>
          <button 
            onClick={() => setActivePage?.('imprint')}
            className="cursor-pointer hover:text-black dark:hover:text-white transition-colors"
          >
            Imprint
          </button>
        </div>
      </div>
    </div>
  </footer>
);
