'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Project } from '@/data/projects';
import { useFontInjection } from '@/hooks/useFontInjection';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/components/pages/HomePage';
import { ProjectsPage } from '@/components/pages/ProjectsPage';
import { StackPage } from '@/components/pages/StackPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { ProjectDetailPage } from '@/components/pages/ProjectDetailPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  useFontInjection();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProject]);

  const handleViewProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setActivePage('project-detail');
  }, []);

  const handleNavChange = useCallback((page: string) => {
    setSelectedProject(null);
    setActivePage(page);
  }, []);

  const renderPage = useMemo(() => {
    if (activePage === 'project-detail' && selectedProject) {
      return <ProjectDetailPage project={selectedProject} onBack={() => handleNavChange('projects')} />;
    }

    switch(activePage) {
      case 'home': return <HomePage setActivePage={handleNavChange} onViewProject={handleViewProject} />;
      case 'projects': return <ProjectsPage onViewProject={handleViewProject} />;
      case 'stack': return <StackPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setActivePage={handleNavChange} onViewProject={handleViewProject} />;
    }
  }, [activePage, selectedProject, handleNavChange, handleViewProject]);

  return (
    <div className={`min-h-screen font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black cursor-none ${darkMode ? 'dark bg-neutral-950 text-white' : 'bg-white text-neutral-900'} overflow-x-hidden`}>
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[5] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      
      <CustomCursor />
      
      <Navigation activePage={selectedProject ? 'projects' : activePage} setActivePage={handleNavChange} />
      
      <main className="min-h-screen relative z-10">
        {renderPage}
      </main>

      <Footer />
      
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-white dark:bg-neutral-800 shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50 hover:scale-110 active:scale-95 transition-all text-xl cursor-none"
        aria-label="Toggle Theme"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
