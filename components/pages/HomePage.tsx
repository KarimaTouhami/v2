'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PROJECTS } from '@/data/projects';
import { EXPERIENCE, EDUCATION } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { ProjectCard } from '@/components/ui/ProjectCard';

export const HomePage: React.FC = () => {
  usePageTitle('Home');

  return (
    <div>
      <section className="pt-32 md:pt-40 pb-24 px-6 max-w-6xl mx-auto min-h-[90vh] flex flex-col justify-center">
        <RevealOnScroll>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-10 border-2 border-green-200 dark:border-green-900/40 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            Available for new opportunities
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="relative">
            <h1 className="text-5xl sm:text-4xl md:text-7xl lg:text-8xl xl:text-7xl font-bold tracking-tight mb-8 leading-none text-neutral-900 dark:text-white font-inter">
              I&apos;m Karima. <br />
              I build <span className="text-neutral-400 dark:text-neutral-600">scalable</span> <br />
              software solutions.
            </h1>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <p className="text-lg md:text-2xl text-neutral-500 max-w-2xl leading-relaxed mb-12 font-light">
            Software Engineer specializing in modern frontend architecture and high-performance web applications. I turn complex problems into simple, elegant user experiences.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg font-inter"
            >
              Start a Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-neutral-900 dark:text-white rounded-full font-bold text-lg border-2 border-neutral-200 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all font-inter"
            >
              View Portfolio
            </Link>
          </div>
        </RevealOnScroll>
      </section>

      <section className="py-24 md:py-32 px-6 max-w-6xl mx-auto border-t border-neutral-100 dark:border-neutral-900">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-16 md:mb-20">
          <SectionHeading number="01">Selected Works</SectionHeading>
          <RevealOnScroll>
            <Link
              href="/projects"
              className="group flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              View all projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {PROJECTS.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 max-w-6xl mx-auto border-t border-neutral-100 dark:border-neutral-900">
        <SectionHeading number="02">About Me</SectionHeading>

        <RevealOnScroll>
          <div className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg mb-8 max-w-3xl">
            <p className="mb-6">
              I&apos;m a Software Engineer specializing in modern frontend architecture and high-performance web applications. I thrive on turning complex technical problems into simple, elegant user experiences.
            </p>
            <p>
              Outside of my core engineering work, I bring a creative edge to everything I do. I&apos;m an artist at heart and love building unique side projects that blend form, function, and code.
            </p>
          </div>
        </RevealOnScroll>

        <div className="flex items-center gap-6 mb-16">
          <RevealOnScroll>
            <a
              href="/Karima-Touhami-Resume.pdf"
              download="Karima-Touhami-Resume.pdf"
              className="inline-flex px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity items-center gap-3 font-bold text-sm shadow-lg font-inter"
            >
              <Download size={18} /> Download Full Resume
            </a>
          </RevealOnScroll>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 border-t border-neutral-200 dark:border-neutral-800 pt-12">
          <div>
            <RevealOnScroll>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8">Career History</h3>
            </RevealOnScroll>
            <div className="space-y-10">
              {EXPERIENCE.map((job, index) => (
                <RevealOnScroll key={index} delay={index * 100}>
                  <div className="group relative pl-9 border-l-2 border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white transition-colors duration-300">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-300 dark:border-neutral-600 group-hover:border-black dark:group-hover:border-white transition-colors duration-300"></div>
                    <div className="pb-8">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
                        <h4 className="font-bold text-lg md:text-xl dark:text-white">{job.company}</h4>
                        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full w-fit">{job.period}</span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 font-medium mb-2">{job.role}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{job.description}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <div>
            <RevealOnScroll>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8">Education</h3>
            </RevealOnScroll>
            <div className="space-y-10">
              {EDUCATION.map((edu, index) => (
                <RevealOnScroll key={index} delay={index * 100}>
                  <div className="group relative pl-9 border-l-2 border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white transition-colors duration-300">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-300 dark:border-neutral-600 group-hover:border-black dark:group-hover:border-white transition-colors duration-300"></div>
                    <div className="pb-8">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
                        <h4 className="font-bold text-lg md:text-xl dark:text-white">{edu.school}</h4>
                        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full w-fit">{edu.period}</span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 font-medium mb-2">{edu.degree} in {edu.field}</p>
                      {edu.description && <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{edu.description}</p>}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll>
              <a
                href="https://www.linkedin.com/posts/karimatouhami_piscine-growthmindset-codinglife-activity-7377401368287866880-OGId"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-600 transition-colors group overflow-hidden"
              >
                <div className="aspect-video bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <img
                    src="/projects/piscine-1.jpg"
                    alt="1337 Piscine post"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 border border-neutral-300 dark:border-neutral-700">
                      <span className="text-[10px] font-bold text-neutral-500">KT</span>
                    </div>
                    <div className="leading-tight">
                      <span className="font-semibold text-xs text-neutral-900 dark:text-white">Karima Touhami</span>
                      <span className="text-[10px] text-neutral-400 ml-1.5">on LinkedIn</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    Just survived the 1337 Rabat Piscine (July 2025) 🫠💻 It was a month of: ⚡ sleepless nights ⚡ endless bugs ⚡ daily evaluations ⚡ and way too much caffeine ☕
                  </p>
                  <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-500">
                    <span>❤️ 14</span>
                    <span>💬 4</span>
                    <span className="ml-auto text-neutral-900 dark:text-white font-medium group-hover:underline">View on LinkedIn →</span>
                  </div>
                </div>
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
};
