import React from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PROJECTS, Project } from '@/data/projects';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { ProjectCard } from '@/components/ui/ProjectCard';

interface ProjectsPageProps {
  onViewProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onViewProject }) => {
  usePageTitle('Projects');
  
  return (
    <div className="pt-32 md:pt-40 pb-20 px-6 max-w-6xl mx-auto">
      <RevealOnScroll className="mb-12 md:mb-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-inter">All Projects</h1>
        <p className="text-lg md:text-xl text-neutral-500 max-w-2xl">
          A curated collection of web applications, tools, and experiments I&apos;ve built.
          Each represents a unique challenge and a new skill learned.
        </p>
      </RevealOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} onClick={onViewProject} index={index} />
        ))}
      </div>
    </div>
  );
};
