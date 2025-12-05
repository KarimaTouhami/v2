import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Project } from '@/data/projects';
import { LazyImage } from '@/components/ui/LazyImage';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PrivateRepoModal } from '@/components/ui/PrivateRepoModal';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack }) => {
  usePageTitle(project.title);
  const [showPrivateModal, setShowPrivateModal] = useState(false);

  const handleGithubClick = (e: React.MouseEvent) => {
    if (project.github === '#' || project.github === 'private') {
      e.preventDefault();
      setShowPrivateModal(true);
    }
  };
  
  return (
    <div className="pt-28 min-h-screen max-w-6xl mx-auto px-6">
      <PrivateRepoModal isOpen={showPrivateModal} onClose={() => setShowPrivateModal(false)} />
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white mb-8 md:mb-12 transition-colors"
      >
        <div className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800 transition-colors">
          <ArrowLeft size={16} />
        </div>
        Back to Projects
      </button>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-20 items-start">
        <div className="animate-in slide-in-from-left-8 duration-700 fade-in fill-mode-both order-2 lg:order-1">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 text-xs font-mono font-medium uppercase tracking-wider">
            {project.category}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight tracking-tight font-inter">{project.title}</h1>
          
          <div className="prose prose-lg dark:prose-invert mb-10 text-neutral-500">
            <p className="text-lg md:text-xl leading-relaxed">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href={project.link} className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 hover:gap-4 hover:shadow-lg hover:shadow-neutral-500/20 font-inter text-center">
              View Live Site <ExternalLink size={18} />
            </a>
            <a 
              href={project.github} 
              onClick={handleGithubClick}
              className="px-8 py-4 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-full font-bold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700 font-inter text-center cursor-pointer"
            >
              Github Repo <Github size={18} />
            </a>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, i) => (
                <span key={i} className="px-3 py-2 md:px-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs md:text-sm font-medium text-neutral-600 dark:text-neutral-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-bottom-8 duration-1000 delay-200 fade-in fill-mode-both aspect-[16/10] order-1 lg:order-2">
          <LazyImage src={project.image} alt={project.title} fill priority className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 animate-in slide-in-from-bottom-4 duration-700 delay-300 fade-in fill-mode-both">
        <div className="p-6 md:p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800">
          <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Year</p>
          <p className="font-bold text-lg md:text-xl">{project.year}</p>
        </div>
        <div className="p-6 md:p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800">
          <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Client</p>
          <p className="font-bold text-lg md:text-xl truncate">{project.company}</p>
        </div>
        <div className="p-6 md:p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800">
          <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Role</p>
          <p className="font-bold text-lg md:text-xl">Lead Dev</p>
        </div>
        <div className="p-6 md:p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800">
          <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Status</p>
          <div className={`flex items-center gap-2 font-bold text-lg md:text-xl ${project.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            {project.status === 'completed' ? 'Completed' : 'Ongoing'}
          </div>
        </div>
      </div>
    </div>
  );
};
