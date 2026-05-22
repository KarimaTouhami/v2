'use client';

import { useEffect } from 'react';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function Shell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black cursor-none bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-x-hidden">
      <div className="fixed inset-0 w-screen h-screen pointer-events-none opacity-[0.03] z-5 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulance type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <CustomCursor />
      <Navigation />

      <main className="min-h-screen relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
