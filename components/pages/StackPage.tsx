import React from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { STACK_CATEGORIES } from '@/data/content';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const StackPage: React.FC = () => {
  usePageTitle('Tech Stack');
  
  return (
    <div className="pt-32 md:pt-40 pb-20 px-6 max-w-6xl mx-auto">
      <RevealOnScroll className="mb-12 md:mb-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-inter">Tech Stack</h1>
        <p className="text-lg md:text-xl text-neutral-500 max-w-2xl">
          My technical arsenal. I focus on modern, scalable, and type-safe technologies
          that allow for rapid development and maintainable codebases.
        </p>
      </RevealOnScroll>
      
      <div className="grid gap-8 md:gap-10">
        {STACK_CATEGORIES.map((category, idx) => (
          <RevealOnScroll key={idx} delay={idx * 150} className="bg-neutral-50 dark:bg-neutral-900/30 rounded-3xl p-6 md:p-8 border border-neutral-100 dark:border-neutral-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white dark:bg-neutral-800 rounded-xl shadow-sm text-neutral-700 dark:text-neutral-300 border border-neutral-100 dark:border-neutral-700">
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold dark:text-white font-inter">{category.title}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="px-3 py-3 md:px-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center font-medium text-sm text-neutral-600 dark:text-neutral-300 hover:border-black dark:hover:border-white hover:scale-105 transition-all cursor-default shadow-sm hover:shadow-md">
                  {skill}
                </div>
              ))}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};
