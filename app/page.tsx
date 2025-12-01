'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Project } from '@/data/projects';
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
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode === 'true';
    }
    return false;
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
    <div className="min-h-screen font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black cursor-none bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-5 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      
      <CustomCursor />
      
      <Navigation activePage={selectedProject ? 'projects' : activePage} setActivePage={handleNavChange} />
      
      <main className="min-h-screen relative z-10">
        {renderPage}
      </main>

      <Footer />
      
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-8 right-8 p-4 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl border-2 border-neutral-200 dark:border-neutral-700 z-50 hover:scale-105 active:scale-95 transition-all text-2xl cursor-none group"
        aria-label="Toggle Theme"
      >
        <span className="group-hover:scale-110 inline-block transition-transform">
          {isMounted && (darkMode ? '☀️' : '🌙')}
        </span>
      </button>
    </div>
  );
}
