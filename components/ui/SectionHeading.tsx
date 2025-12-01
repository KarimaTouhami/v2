import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';

interface SectionHeadingProps {
  children: React.ReactNode;
  number: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children, number }) => (
  <RevealOnScroll className="flex items-center gap-3 md:gap-4 mb-10 md:mb-12 group">
    <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 border-neutral-300 dark:border-neutral-700 text-sm font-bold font-mono text-neutral-500 dark:text-neutral-400 group-hover:border-black dark:group-hover:border-white group-hover:text-black dark:group-hover:text-white transition-all duration-300 group-hover:scale-110">
      {number}
    </span>
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white font-inter whitespace-nowrap">
      {children}
    </h2>
  </RevealOnScroll>
);
