'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { NAV_LINKS } from '@/data/navigation';

interface NavigationProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const Navigation = React.memo<NavigationProps>(({ activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const scrolled = scrollY > 20;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || isMenuOpen ? 'bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl shadow-lg border-b border-neutral-200/50 dark:border-neutral-800/50 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div 
          onClick={() => { setActivePage('home'); setIsMenuOpen(false); }}
          className="group cursor-pointer flex items-center gap-3 select-none relative z-50"
        >
          <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black font-bold text-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-black/20 dark:shadow-white/20 font-inter">
            K
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none tracking-tight font-inter">Karima Touhami</span>
            <span className="text-xs text-neutral-500 font-mono group-hover:text-neutral-800 dark:group-hover:text-neutral-300 transition-colors">Software Engineer</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 p-1.5 rounded-full bg-neutral-100/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 mr-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                aria-current={activePage === link.id ? 'page' : undefined}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  activePage === link.id 
                    ? 'bg-white dark:bg-neutral-800 text-black dark:text-white shadow-md' 
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
              </button>
            ))}
          </div>
          <button className="hidden lg:flex px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-bold hover:scale-105 transition-transform shadow-lg font-inter">
            Download CV
          </button>
        </div>

        <button 
          className="md:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors relative z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 pt-24 bg-white dark:bg-neutral-950 z-40 p-6 animate-in slide-in-from-right-10 duration-200 flex flex-col h-screen">
          <div className="flex flex-col gap-2 flex-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setIsMenuOpen(false);
                }}
                className={`p-5 text-left text-3xl font-bold rounded-2xl transition-all active:scale-95 ${
                  activePage === link.id 
                    ? 'text-black dark:text-white' 
                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="mt-auto mb-10 pb-10">
            <button className="w-full p-4 text-center text-lg font-bold rounded-2xl bg-black dark:bg-white text-white dark:text-black">
              Download CV
            </button>
          </div>
        </div>
      )}
    </nav>
  );
});

Navigation.displayName = 'Navigation';
