import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';

interface SectionHeadingProps {
  children: React.ReactNode;
  number: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children, number }) => (
  <RevealOnScroll className="flex items-center gap-4 mb-8 md:mb-10 group">
    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 text-sm font-mono text-neutral-500 group-hover:border-black dark:group-hover:border-white group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
      {number}
    </span>
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white font-inter">
      {children}
    </h2>
  </RevealOnScroll>
);
