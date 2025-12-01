import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/data/projects';
import { LazyImage } from './LazyImage';
import { RevealOnScroll } from './RevealOnScroll';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
}

export const ProjectCard = React.memo<ProjectCardProps>(({ project, onClick, index }) => (
  <RevealOnScroll delay={index * 100}>
    <div 
      onClick={() => onClick(project)}
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-neutral-300/20 dark:hover:shadow-black/40 duration-500 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
    >
      <div className="aspect-video w-full overflow-hidden">
        <LazyImage 
          src={project.image} 
          alt={project.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8 text-white">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out">
          <p className="text-green-400 font-mono text-xs mb-2 uppercase tracking-wider">{project.category}</p>
          <h3 className="text-xl md:text-2xl font-bold mb-2 font-inter">{project.title}</h3>
          <p className="text-sm text-neutral-300 mb-4 line-clamp-2">{project.description}</p>
          <div className="flex gap-2 flex-wrap">
            {project.stack.slice(0, 3).map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs border border-white/10">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-5 md:p-6 bg-white dark:bg-neutral-900 absolute bottom-0 w-full group-hover:translate-y-full transition-transform duration-500 ease-in-out border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-inter">{project.title}</h3>
            <p className="text-sm text-neutral-500">{project.category} • {project.year}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
            <ArrowRight size={16} className="text-neutral-600 dark:text-neutral-400" />
          </div>
        </div>
      </div>
    </div>
  </RevealOnScroll>
));

ProjectCard.displayName = 'ProjectCard';
