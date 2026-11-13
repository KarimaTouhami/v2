'use client';

import { useEffect } from 'react';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function Shell({ children }: { children: React.ReactNode }) {
  /* With no explicit choice saved, keep following the OS theme live. */
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem('theme')) return;
      } catch {
        /* ignore */
      }
      document.documentElement.classList.toggle('dark', e.matches);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-full focus:bg-neutral-900 focus:text-white dark:focus:bg-white dark:focus:text-black focus:font-semibold focus:text-sm"
      >
        Skip to content
      </a>

      <div aria-hidden="true" className="scroll-progress fixed top-0 left-0 right-0 h-0.5 z-[60] bg-neutral-900 dark:bg-white pointer-events-none" />

      <div
        aria-hidden="true"
        className="fixed inset-0 w-screen h-screen pointer-events-none opacity-[0.04] dark:opacity-[0.06] z-[5] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      <CustomCursor />
      <CommandPalette />
      <Navigation />

      <main id="main" tabIndex={-1} className="min-h-screen relative z-10 outline-none">
        {children}
      </main>

      <Footer />
    </div>
  );
}
