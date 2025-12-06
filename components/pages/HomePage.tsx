import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PROJECTS } from '@/data/projects';
import { EXPERIENCE, APPROACH_STEPS, EDUCATION } from '@/data/content';
import { Project } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { ProjectCard } from '@/components/ui/ProjectCard';

interface HomePageProps {
  setActivePage: (page: string) => void;
  onViewProject: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActivePage, onViewProject }) => {
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
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-7xl font-bold tracking-tight mb-8 leading-none text-neutral-900 dark:text-white font-inter">
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
            <button 
              onClick={() => setActivePage('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg font-inter"
            >
              Start a Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setActivePage('projects')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-neutral-900 dark:text-white rounded-full font-bold text-lg border-2 border-neutral-200 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all font-inter"
            >
              View Portfolio
            </button>
          </div>
        </RevealOnScroll>
      </section>

      <section className="py-24 md:py-32 px-6 max-w-6xl mx-auto border-t border-neutral-100 dark:border-neutral-900">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-16 md:mb-20">
          <SectionHeading number="01">Selected Works</SectionHeading>
          <RevealOnScroll>
            <button 
              onClick={() => setActivePage('projects')}
              className="group flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              View all projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {PROJECTS.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.id} project={project} onClick={onViewProject} index={index} />
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 border-t border-neutral-100 dark:border-neutral-900">
        <div>
          <SectionHeading number="02">About Me</SectionHeading>
          <RevealOnScroll>
            <div className="prose prose-lg dark:prose-invert text-neutral-500">
              <p className="mb-6">
                I&apos;m a Software Development Engineer from Tangier, Morocco. I graduated with a degree 
                in Software Engineering from <strong className="text-black dark:text-white">SUPTEM</strong> and 
                honed my craft at <strong className="text-black dark:text-white">ALX Africa</strong>.
              </p>
              <p className="mb-8">
                My engineering philosophy is simple: <strong>User Experience is King, Performance is Queen.</strong> I don&apos;t just write code; I build solutions that drive business growth and user satisfaction.
              </p>
            </div>

            <div className="space-y-6 mb-10">
              {APPROACH_STEPS.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white">{step.title}</h4>
                    <p className="text-sm text-neutral-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a 
              href="/Karima-Touhami-Resume.pdf" 
              download="Karima-Touhami-Resume.pdf"
              className="px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity flex items-center gap-3 font-bold text-sm shadow-lg font-inter w-fit"
            >
              <Download size={18} /> Download Full Resume
            </a>
          </RevealOnScroll>
        </div>

        <div>
          <div className="mb-16">
            <RevealOnScroll>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-10">Career History</h3>
            </RevealOnScroll>
            <div className="space-y-6">
              {EXPERIENCE.map((job, index) => (
                <RevealOnScroll key={index} delay={index * 100}>
                  <div className="group relative pl-8 border-l border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors duration-300">
                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-black dark:group-hover:bg-white transition-colors duration-300 shadow-sm"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg md:text-xl dark:text-white">{job.company}</h4>
                      <span className="text-xs font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded">{job.period}</span>
                    </div>
                    <p className="text-neutral-800 dark:text-neutral-300 font-medium mb-2">{job.role}</p>
                    <p className="text-sm text-neutral-500 leading-relaxed">{job.description}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <div>
            <RevealOnScroll>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-10">Education</h3>
            </RevealOnScroll>
            <div className="space-y-6">
              {EDUCATION.map((edu, index) => (
                <RevealOnScroll key={index} delay={index * 100}>
                  <div className="group relative pl-8 border-l border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors duration-300">
                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-black dark:group-hover:bg-white transition-colors duration-300 shadow-sm"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg md:text-xl dark:text-white">{edu.school}</h4>
                      <span className="text-xs font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded">{edu.period}</span>
                    </div>
                    <p className="text-neutral-800 dark:text-neutral-300 font-medium mb-2">{edu.degree} in {edu.field}</p>
                    {edu.description && <p className="text-sm text-neutral-500 leading-relaxed">{edu.description}</p>}
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
