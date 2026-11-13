'use client';

import { useCallback, useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
};

const getSnapshot = () => document.documentElement.classList.contains('dark');
const getServerSnapshot = () => false;

type Origin = { x: number; y: number };

/**
 * Reads the theme straight from the `.dark` class on <html> (set before paint
 * by the inline script in layout.tsx), so every consumer stays in sync.
 */
export const useTheme = () => {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((dark: boolean, origin?: Origin) => {
    const root = document.documentElement;
    const apply = () => {
      root.classList.toggle('dark', dark);
      try {
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        localStorage.removeItem('darkMode');
      } catch {
        /* storage unavailable (private mode): theme still applies for this visit */
      }
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduceMotion) {
      apply();
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.style.setProperty('--vt-r', `${radius}px`);

    document.startViewTransition(apply);
  }, []);

  const toggleTheme = useCallback(
    (origin?: Origin) => setTheme(!getSnapshot(), origin),
    [setTheme],
  );

  return { isDark, setTheme, toggleTheme };
};
