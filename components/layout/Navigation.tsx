'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Github, Linkedin, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { NAV_LINKS } from '@/data/navigation';
import { useTheme } from '@/hooks/useTheme';
import { openCommandPalette, useShortcutLabel } from '@/components/ui/CommandPalette';

const hrefFor = (id: string) => (id === 'home' ? '/' : `/${id}`);

/** Scrolled past the top, and hidden while scrolling down (shown again on any upward scroll). */
const useNavScrollState = () => {
  const [state, setState] = useState({ scrolled: false, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      setState((prev) => {
        const scrolled = y > 20;
        // Small threshold so trackpad jitter doesn't flicker the bar.
        const hidden = y > 160 && (Math.abs(delta) < 6 ? prev.hidden : delta > 0);
        return prev.scrolled === scrolled && prev.hidden === hidden ? prev : { scrolled, hidden };
      });
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return state;
};

const ThemeButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative h-10 w-10 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 active:scale-90 transition-all duration-300 ${className}`}
    >
      <Sun size={17} className="absolute transition-all duration-500 ease-(--ease-spring) rotate-0 scale-100 opacity-100 dark:-rotate-90 dark:scale-0 dark:opacity-0" />
      <Moon size={17} className="absolute transition-all duration-500 ease-(--ease-spring) rotate-90 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100" />
    </button>
  );
};

export const Navigation = React.memo(() => {
  const pathname = usePathname();
  const { scrolled, hidden } = useNavScrollState();
  // Tie the mobile menu to the route it was opened on so navigating closes it.
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const isMenuOpen = menuOpenOn === pathname;
  const shortcut = useShortcutLabel();

  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({ left: 0, width: 0, ready: false });

  const isActive = (id: string) => {
    if (id === 'home') return pathname === '/';
    return pathname === `/${id}` || pathname.startsWith(`/${id}/`);
  };
  const activeId = NAV_LINKS.find((l) => isActive(l.id))?.id ?? null;

  /* Slide the active pill to whichever link matches the route. */
  useLayoutEffect(() => {
    const measure = () => {
      const el = activeId ? linkRefs.current[activeId] : null;
      setIndicator((prev) =>
        el
          ? { left: el.offsetLeft, width: el.offsetWidth, ready: true }
          : { ...prev, width: 0 },
      );
    };
    measure();
    window.addEventListener('resize', measure);
    // Fonts swapping in can change link widths after first paint.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener('resize', measure);
  }, [activeId]);

  /* Mobile menu: scroll lock + Escape. */
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpenOn(null);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const solid = scrolled || isMenuOpen;

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-[translate,background-color,border-color,padding] duration-500 ease-(--ease-out-expo) border-b ${
        hidden && !isMenuOpen ? '-translate-y-full' : ''
      } ${
        solid
          ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl backdrop-saturate-150 border-neutral-200/80 dark:border-neutral-800/80 py-3'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => setMenuOpenOn(null)}
          className="group flex items-center gap-3 select-none relative z-50 rounded-lg"
        >
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none tracking-tight font-inter">Karima Touhami</span>
            <span className="text-xs text-neutral-500 font-mono group-hover:text-neutral-800 dark:group-hover:text-neutral-300 transition-colors">Full-Stack Engineer · AI &amp; HCI</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <div
            className="relative flex items-center gap-1 p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mr-2"
          >
            <span
              aria-hidden="true"
              className={`absolute top-1.5 bottom-1.5 left-0 rounded-full bg-white dark:bg-neutral-800 shadow-md ${
                indicator.ready ? 'transition-[translate,width,opacity] duration-500 ease-(--ease-out-expo)' : ''
              } ${indicator.width ? 'opacity-100' : 'opacity-0'}`}
              style={{ width: indicator.width, translate: `${indicator.left}px 0` }}
            />
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                ref={(el) => {
                  linkRefs.current[link.id] = el;
                }}
                href={hrefFor(link.id)}
                aria-current={isActive(link.id) ? 'page' : undefined}
                className={`relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  isActive(link.id)
                    ? 'text-black dark:text-white'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open command menu"
            aria-keyshortcuts="Meta+K Control+K"
            className="group h-10 flex items-center gap-2 pl-3 pr-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
          >
            <Search size={15} />
            <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors">
              {shortcut}
            </kbd>
          </button>
          <ThemeButton />
        </div>

        <div className="md:hidden flex items-center gap-2 relative z-50">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Search"
            className="h-10 w-10 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Search size={20} />
          </button>
          <ThemeButton />
          <button
            type="button"
            className="h-10 w-10 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
            onClick={() => setMenuOpenOn(isMenuOpen ? null : pathname)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="relative h-6 w-6">
              <Menu size={24} className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
              <X size={24} className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`} />
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="md:hidden fixed inset-0 top-0 h-dvh pt-24 pb-10 px-6 bg-white dark:bg-neutral-950 z-40 flex flex-col animate-in fade-in duration-300"
        >
          <div className="flex flex-col gap-1 flex-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.id}
                href={hrefFor(link.id)}
                onClick={() => setMenuOpenOn(null)}
                aria-current={isActive(link.id) ? 'page' : undefined}
                style={{ animationDelay: `${60 + i * 50}ms` }}
                className={`flex items-baseline gap-4 py-4 text-4xl font-bold tracking-tight font-inter border-b border-neutral-100 dark:border-neutral-900 transition-colors active:opacity-60 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                  isActive(link.id)
                    ? 'text-black dark:text-white'
                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                }`}
              >
                <span className="font-mono text-xs font-normal text-neutral-400">0{i + 1}</span>
                {link.name}
              </Link>
            ))}
          </div>
          <div
            className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: '280ms' }}
          >
            {[
              { href: 'https://github.com/KarimaTouhami', label: 'GitHub', icon: <Github size={20} /> },
              { href: 'https://linkedin.com/in/karimatouhami', label: 'LinkedIn', icon: <Linkedin size={20} /> },
              { href: 'https://medium.com/@karimatouhami', label: 'Medium', icon: <BookOpen size={20} /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-3.5 rounded-full border-2 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 active:scale-95 transition-transform"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
});

Navigation.displayName = 'Navigation';
